/**
 * @file createTokenizer
 * @module vfile-tokenizer/createTokenizer
 */

import codes from '#enums/codes'
import ev from '#enums/ev'
import constant from '#internal/constant'
import createDefineSkip from '#internal/create-define-skip'
import disabled from '#internal/disabled'
import noop from '#internal/noop'
import onsuccessfulcheck from '#internal/onsuccessfulcheck'
import skip from '#internal/skip'
import toList from '#internal/to-list'
import createPreprocess from '#preprocess'
import eos from '#utils/eof'
import eol from '#utils/eol'
import push from '#utils/push'
import resolveAll from '#utils/resolve-all'
import serializeChunks from '#utils/serialize-chunks'
import splice from '#utils/splice'
import { u } from '@flex-development/unist-util-builder'
import { Location } from '@flex-development/vfile-location'
import type {
  Attempt,
  Chunk,
  Code,
  Column,
  Construct,
  ConstructPack,
  ConstructRecord,
  Constructs,
  Effects,
  Event,
  FileLike,
  Guard,
  Info,
  InitialConstruct,
  Line,
  List,
  Options,
  Place,
  Position,
  Preprocess,
  ReturnHandle,
  State,
  Token,
  TokenFactory,
  TokenFields,
  TokenInfo,
  TokenizeContext,
  TokenType,
  Value
} from '@flex-development/vfile-tokenizer'
import createDebug, { type Debugger } from 'debug'
import { ok as assert } from 'devlop'

/**
 * Create a tokenizer.
 *
 * @see {@linkcode Options}
 * @see {@linkcode TokenizeContext}
 *
 * @this {void}
 *
 * @param {Options} options
 *  Tokenizer options
 * @return {TokenizeContext}
 *  Tokenize context
 */
function createTokenizer(this: void, options: Options): TokenizeContext {
  /**
   * Debug logger.
   *
   * @const {Debugger} debug
   */
  const debug: Debugger = createDebug(options.debug ?? 'vfile-tokenizer')

  /**
   * Initial construct.
   *
   * @const {InitialConstruct} initialize
   */
  const initialize: InitialConstruct = typeof options.initial === 'function'
    ? options.initial()
    : options.initial

  /**
   * Location utility.
   *
   * @const {Location} location
   */
  const location: Location = new Location(null, options.from)

  /**
   * Turn a value into character code chunks.
   *
   * @const {Preprocess} preprocess
   */
  const preprocess: Preprocess = options.preprocess ?? createPreprocess()

  /**
   * Constructs with `resolveAll` handlers.
   *
   * @const {Construct[]} resolveAlls
   */
  const resolveAlls: Construct[] = []

  /**
   * Map, where each key is a line number and each value a column to be skipped
   * to when the tokenizer has reached that line.
   *
   * @const {Record<Line, Column>} skips
   */
  const skips: Record<Line, Column> = {}

  /**
   * Create a new token.
   *
   * @param {TokenType} type
   *  Token type
   * @param {TokenInfo} info
   *  Token info
   * @return {Token}
   *  New token
   */
  const token: TokenFactory = options.token ?? function token(
    type: TokenType,
    info: TokenInfo
  ): Token {
    return Object.defineProperties(u(type, info), {
      next: { enumerable: false, writable: true },
      previous: { enumerable: false, writable: true }
    })
  }

  /**
   * Character code chunks.
   *
   * @var {Code[]} chunks
   */
  let chunks: Code[] = []

  /**
   * Character code consumption state, used for tracking bugs.
   *
   * @var {boolean | null} consumed
   */
  let consumed: boolean | null = true

  /**
   * Current point in file.
   *
   * @var {Place} place
   */
  let place: Place = location.place as Place

  /**
   * Token stack.
   *
   * @var {Token[]} stack
   */
  let stack: Token[] = []

  /**
   * Tools used for tokenizing.
   *
   * @const {Effects} effects
   */
  const effects: Effects = {
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    consume,
    enter,
    exit,
    interrupt: constructFactory(onsuccessfulcheck, true)
  }

  /**
   * State and tools for resolving and serializing.
   *
   * @var {TokenizeContext} context
   */
  let context: TokenizeContext = {
    code: codes.eof,
    currentConstruct: undefined,
    defineSkip: createDefineSkip(place, skips, debug),
    events: [],
    next: codes.eof,
    now,
    previous: codes.eof,
    serializeChunks,
    sliceSerialize,
    sliceStream,
    token,
    write
  }

  context = options.finalizeContext?.(context) ?? context
  onsuccessfulconstruct(initialize)
  place._index = 0

  /**
   * Expected character code, used for tracking bugs.
   *
   * @var {Code} expected
   */
  let expected: Code

  /**
   * Current state.
   *
   * @var {State | undefined} state
   */
  let state: State | undefined = initialize.tokenize.call(context, effects)

  return context

  /**
   * Factory to attempt/check/interrupt.
   *
   * @this {void}
   *
   * @param {ReturnHandle} onreturn
   *  Successful construct callback
   * @param {boolean | null | undefined} [interrupt]
   *  Interrupting?
   * @return {Attempt}
   *  attempt/check/interrupt
   */
  function constructFactory(
    this: void,
    onreturn: ReturnHandle,
    interrupt?: boolean | null | undefined
  ): Attempt {
    return hook

    /**
     * Handle an object mapping codes to constructs, a list of constructs, or a
     * single construct.
     *
     * @this {void}
     *
     * @param {Constructs} construct
     *  Constructs to try
     * @param {State | undefined} [succ]
     *  Successful tokenization state
     * @param {State | undefined} [fail]
     *  Failed tokenization state
     * @return {State}
     *  Next state
     */
    function hook(
      this: void,
      construct: Constructs,
      succ: State | undefined = noop,
      fail?: State | undefined
    ): State {
      /**
       * Current construct.
       *
       * @var {Construct} currentConstruct
       */
      let currentConstruct: Construct

      /**
       * Info passed around.
       *
       * @var {Info} info
       */
      let info: Info

      /**
       * Index of current construct.
       *
       * @var {number} j
       */
      let j: number

      /**
       * Construct list.
       *
       * @var {Construct[]} list
       */
      let list: Construct[]

      // handle list of constructs, single construct, or map of constructs
      return !Array.isArray(construct) && !('tokenize' in construct)
        ? handleConstructRecord(construct)
        : handleConstructList(toList(construct))

      /**
       * Handle a list of constructs.
       *
       * @this {void}
       *
       * @param {Construct[]} constructs
       *  Constructs to try
       * @return {State}
       *  Next state
       */
      function handleConstructList(this: void, constructs: Construct[]): State {
        list = constructs
        j = 0

        /* v8 ignore next 3 */ if (constructs.length === 0) {
          assert(fail, 'expected `fail` to be given')
          return fail
        }

        assert(constructs[j], 'expected `constructs[j]`')
        return handleConstruct(constructs[j]!)
      }

      /**
       * Handle a construct record.
       *
       * @this {void}
       *
       * @param {ConstructRecord} map
       *  Constructs to try
       * @return {State}
       *  Next state
       */
      function handleConstructRecord(this: void, map: ConstructRecord): State {
        return run

        /**
         * Check if `value` looks like a construct, or list of constructs.
         *
         * @this {void}
         *
         * @param {unknown} value
         *  The thing to check
         * @return {value is ConstructPack}
         *  `true` if value is an object
         */
        function is(this: void, value: unknown): value is ConstructPack {
          return typeof value === 'object'
        }

        /**
         * @this {void}
         *
         * @param {Code} code
         *  The current character code
         * @return {State | undefined}
         *  Next state
         */
        function run(this: void, code: Code): State | undefined {
          return handleConstructList([
            ...[map.nullFirst].flat().filter(value => is(value)),
            ...[code !== null && map[code]].flat().filter(value => is(value)),
            ...[map.null].flat().filter(value => is(value))
          ])(code)
        }
      }

      /**
       * Handle a single construct.
       *
       * @this {void}
       *
       * @param {Construct} construct
       *  Construct to try
       * @return {State}
       *  Next state
       */
      function handleConstruct(this: void, construct: Construct): State {
        return start

        /**
         * @this {void}
         *
         * @param {Code} code
         *  The current character code
         * @return {State | undefined}
         *  Next state
         */
        function start(code: Code): State | undefined {
          info = store()
          currentConstruct = construct

          if (!construct.partial) context.currentConstruct = construct

          context.interrupt = interrupt

          /**
           * Check if the previous character code can come before this
           * construct.
           *
           * @const {Guard} previous
           */
          const previous: Guard = construct.previous ?? constant(true)

          /**
           * Check if the current character code can start before this
           * construct.
           *
           * @const {Guard} test
           */
          const test: Guard = construct.test ?? constant(true)

          /**
           * Next state.
           *
           * @var {State} state
           */
          let state: State = nok

          if (
            !disabled(options.disabled, construct.name) &&
            previous.call(context, context.previous) &&
            test.call(context, code)
          ) {
            state = construct.tokenize.call(context, effects, ok, nok)
          }

          return state(code)
        }
      }

      /**
       * State to go on successful tokenization.
       *
       * @this {void}
       *
       * @param {Code} code
       *  The current character code
       * @return {State | undefined}
       *  Next state
       */
      function ok(this: void, code: Code): State {
        assert(code === expected, 'expected `code` to equal expected code')
        debug('ok: `%o`', code)
        consumed = true
        onreturn(currentConstruct, info)
        return succ
      }

      /**
       * State to go on failed tokenization.
       *
       * @this {void}
       *
       * @param {Code} code
       *  The current character code
       * @return {State | undefined}
       *  Next state
       */
      function nok(this: void, code: Code): State | undefined {
        assert(list, 'expected construct list')
        assert(code === expected, 'expected `code` to equal expected code')
        debug('nok: `%o`', code)
        consumed = true
        info.restore()

        /**
         * Next state.
         *
         * @var {State | undefined} state
         */
        let state: State | undefined = fail

        if (++j < list.length) {
          state = handleConstruct(list[j]!)
        }

        return state
      }
    }
  }

  /**
   * Consume a character code and move onto the next.
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {undefined}
   */
  function consume(this: void, code: Code): undefined {
    assert(code === expected, 'expected `code` to equal expected code')
    debug('consume: `%o`', code)
    assert(consumed === null, 'expected unconsumed code')

    context.code = read()
    context.next = peek()
    context.previous = code

    return void (consumed = true, code)
  }

  /**
   * Start a new token.
   *
   * @this {void}
   *
   * @param {TokenType} type
   *  Token type
   * @param {TokenFields | null | undefined} [fields]
   *  Token fields
   * @return {Token}
   *  Open token
   */
  function enter(
    this: void,
    type: TokenType,
    fields?: TokenFields | null | undefined
  ): Token {
    skip(place, skips)

    /**
     * New token.
     *
     * @const {Token} token
     */
    const token: Token = context.token(type, {
      ...fields,
      start: now(), // eslint-disable-next-line sort-keys
      end: location.point(-1) as Place
    })

    assert(typeof type === 'string', 'expected `type` to be a string')
    assert(type.length > 0, 'expected `type` to be a non-empty string')
    debug('enter: `%s`; %o', type, token.start)

    context.events.push([ev.enter, token, context])
    stack.push(token)

    return token
  }

  /**
   * Close an open token.
   *
   * @this {void}
   *
   * @param {TokenType} type
   *  Token type
   * @return {Token}
   *  Closed token
   */
  function exit(this: void, type: TokenType): Token {
    assert(typeof type === 'string', 'expected `type` to be a string')
    assert(type.length > 0, 'expected `type` to be a non-empty string')

    /**
     * The token to close.
     *
     * @const {Token | undefined} token
     */
    const token: Token | undefined = stack.pop()

    assert(token, 'cannot exit without open token')

    token.end = now()
    debug('exit: `%s`; %o', token.type, token.end)

    assert(type === token.type, 'expected exit token to match current token')
    context.events.push([ev.exit, token, context])

    return token
  }

  /**
   * Deal with one character code.
   *
   * @this {void}
   *
   * @param {Code} code
   *  The character code to handle
   * @return {undefined}
   */
  function go(this: void, code: Code): undefined {
    assert(consumed, `expected code \`${code}\` to be consumed`)
    consumed = null
    debug('go: `%o`, %j', code, /* v8 ignore next */ state?.name)
    expected = code
    assert(typeof state === 'function', 'expected state function')
    state = state(code)
    return void code
  }

  /**
   * Get the current point in the file.
   *
   * @this {void}
   *
   * @return {Place}
   *  Current point in file
   */
  function now(this: void): Place {
    const { _index, column, line, offset } = place
    // eslint-disable-next-line sort-keys
    return { line, column, offset, _index }
  }

  /**
   * Resolve events.
   *
   * @this {void}
   *
   * @param {Construct} construct
   *  The successful construct
   * @param {Pick<Info, 'from'> | null | undefined} [info]
   *  Info passed around
   * @return {undefined}
   */
  function onsuccessfulconstruct(
    this: void,
    construct: Construct,
    info?: Pick<Info, 'from'> | null | undefined
  ): undefined {
    if (construct.resolveAll && !resolveAlls.includes(construct)) {
      resolveAlls.push(construct)
    }

    if (info) {
      // resolve the events parsed by `construct.tokenize`.
      if (construct.resolve) {
        splice(
          context.events,
          info.from,
          context.events.length - info.from,
          construct.resolve(context.events.slice(info.from), context)
        )
      }

      // resolve the events parsed from the start of content (which may include
      // other constructs) to the last one parsed by `construct.tokenize`.
      if (construct.resolveTo) {
        context.events = construct.resolveTo(context.events, context)
      }

      assert(
        /* v8 ignore next 3 */ !!construct.partial ||
          !context.events.length ||
          context.events[context.events.length - 1]![0] === ev.exit,
        'expected last token to end'
      )
    }

    return void construct
  }

  /**
   * Get the next `k`-th character code from the file without changing the
   * position of the tokenizer.
   *
   * @this {void}
   *
   * @param {number?} [k=1]
   *  Difference between index of next `k`-th character code and index of
   *  current character code
   * @return {Code}
   *  Peeked character code
   */
  function peek(this: void, k: number = 1): Code {
    return chunks[place._index + k] ?? codes.eof
  }

  /**
   * Get the next character code.
   *
   * Unlike {@linkcode peek}, this method changes the position of the reader.
   *
   * @this {void}
   *
   * @return {Code}
   *  Next character code
   */
  function read(this: void): Code {
    /**
     * Current character code.
     *
     * @const {Code} code
     */
    const code: Code = peek(0)

    if ((options.eol ?? eol)(code)) {
      place.column = 1
      place.line++
      place.offset += code === codes.crlf ? 2 : 1
      debug('position after eol: %o', place)
    } else if (code !== codes.vs && code !== codes.eof) {
      place.column++
      place.offset++
    } else if (code === codes.vs && context.previous === codes.vht) {
      place.column++
    }

    return chunks[++place._index] ?? codes.eof
  }

  /**
   * Get the text spanning `range`.
   *
   * @this {void}
   *
   * @param {Position} range
   *  Position in stream
   * @param {boolean | null | undefined} [expandTabs]
   *  Whether to expand tabs
   * @return {string}
   *  Serialized slice
   */
  function sliceSerialize(
    this: void,
    range: Position,
    expandTabs?: boolean | null | undefined
  ): string {
    return context.serializeChunks(context.sliceStream(range), expandTabs)
  }

  /**
   * Get the chunks spanning `range`.
   *
   * @this {void}
   *
   * @param {Position} range
   *  Position in stream
   * @return {Code[]}
   *  Chunks in stream spanning `range`
   */
  function sliceStream(this: void, range: Position): Code[] {
    return chunks.slice(range.start._index, range.end._index)
  }

  /**
   * Store state.
   *
   * @this {void}
   *
   * @return {Info}
   *  Info passed around
   */
  function store(this: void): Info {
    /**
     * The current character code.
     *
     * @const {Code} code
     */
    const code: Code = context.code

    /**
     * The current construct.
     *
     * @const {Construct | null | undefined} construct
     */
    const construct: Construct | null | undefined = context.currentConstruct

    /**
     * The current number of events.
     *
     * @const {number} from
     */
    const from: number = context.events.length

    /**
     * The current point.
     *
     * @const {Place} lastPlace
     */
    const lastPlace: Place = now()

    /**
     * The current token stack.
     *
     * @const {Token[]} lastStack
     */
    const lastStack: Token[] = [...stack]

    /**
     * The next character code.
     *
     * @const {Code} next
     */
    const next: Code = context.next

    /**
     * The previous character code.
     *
     * @const {Code} previous
     */
    const previous: Code = context.previous

    return { from, restore }

    /**
     * Restore state.
     *
     * @this {void}
     *
     * @return {undefined}
     */
    function restore(this: void): undefined {
      place = lastPlace
      stack = lastStack

      context.code = code
      context.currentConstruct = construct
      context.events.length = from
      context.next = next
      context.previous = previous

      skip(place, skips)
      return void debug('restore: %o', place)
    }
  }

  /**
   * Main loop to walk through {@linkcode chunks}.
   *
   * > 👉 **Note**: The {@linkcode read} method modifies `_index` in
   * > {@linkcode place} to advance the loop until the end of stream.
   *
   * @this {void}
   *
   * @return {undefined}
   */
  function tokenize(this: void): undefined {
    while (place._index < chunks.length) go(peek(0))
    eos(chunks[chunks.length - 1]) && state && go(context.code)
    return void state
  }

  /**
   * Write a slice of chunks.
   *
   * The eof code (`null`) can be used to signal end of stream.
   *
   * @this {void}
   *
   * @param {Chunk | FileLike | List<Chunk | FileLike | Value> | Value} slice
   *  The chunk or chunks to write
   * @return {Event[]}
   *  List of events
   */
  function write(
    this: void,
    slice: Chunk | FileLike | List<Chunk | FileLike | Value> | Value
  ): Event[] {
    chunks = push(chunks, [...toList(slice)].flatMap(chunk => {
      return typeof chunk !== 'number' && chunk !== codes.eof
        ? preprocess(chunk, options.encoding)
        : chunk
    }))

    tokenize()

    // exit if not done, resolvers might change stuff.
    if (!eos(chunks[chunks.length - 1])) return []

    // resolve events.
    onsuccessfulconstruct(initialize, { from: 0 })
    context.events = resolveAll(resolveAlls, context.events, context)

    return context.events
  }
}

export default createTokenizer
