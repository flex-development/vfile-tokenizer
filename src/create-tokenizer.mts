/**
 * @file createTokenizer
 * @module vfile-tokenizer/createTokenizer
 */

import { chars, codes, ev } from '#enums/index'
import createPreprocessor from '#preprocess'
import { isLineEnding, resolveAll } from '#utils/index'
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
  DefineSkip,
  Effects,
  Event,
  Info,
  InitialConstruct,
  Line,
  Options,
  Place,
  Point,
  Position,
  Preprocessor,
  ReturnHandle,
  State,
  Token,
  TokenFactory,
  TokenFields,
  TokenInfo,
  TokenizeContext,
  TokenType
} from '@flex-development/vfile-tokenizer'
import createDebug, { type Debugger } from 'debug'
import { ok as assert } from 'devlop'
import { push, splice } from 'micromark-util-chunked'

/**
 * Create a tokenizer.
 *
 * @see {@linkcode Options}
 * @see {@linkcode TokenizeContext}
 *
 * @this {void}
 *
 * @param {Options} options
 *  Tokenize options
 * @return {TokenizeContext}
 *  Tokenize context
 */
function createTokenizer(this: void, options: Options): TokenizeContext {
  /**
   * Debug logger.
   *
   * @const {Debugger} debug
   */
  const debug: Debugger = createDebug(options.debug ?? 'unist-util-tokenize')

  /**
   * Initial construct.
   *
   * @const {InitialConstruct} initialize
   */
  const initialize: InitialConstruct = typeof options.initialize === 'function'
    ? options.initialize()
    : options.initialize

  /**
   * Location utility.
   *
   * @const {Location} location
   */
  const location: Location = new Location(null, options.from)

  /**
   * Turn a value into character code chunks.
   *
   * @const {Preprocessor} preprocess
   */
  const preprocess: Preprocessor = options.preprocess ?? createPreprocessor()

  /**
   * Constructs with `resolveAll` handlers.
   *
   * @const {Construct[]} resolveAllConstructs
   */
  const resolveAllConstructs: Construct[] = []

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
    defineSkip,
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
  initialize.resolveAll && resolveAllConstructs.push(initialize)
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
   * @see {@linkcode Attempt}
   * @see {@linkcode ReturnHandle}
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
     * Handle either an object mapping codes to constructs, a list of
     * constructs, or a single construct.
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
      succ: State = /* v8 ignore next */ () => undefined,
      fail?: State
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
      return Array.isArray(construct)
        ? handleConstructList(construct)
        : 'tokenize' in construct
        ? handleConstructList([construct])
        : handleConstructRecord(construct)

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
          const { name, partial, previous, test, tokenize } = construct

          info = store()
          currentConstruct = construct

          if (!partial) context.currentConstruct = construct

          context.interrupt = interrupt as boolean | undefined

          switch (true) {
            case !!name && !!options.disabled?.includes(name):
            case !!previous && !previous.call(context, context.previous):
            case !!test && !test.call(context, code):
              return nok(code)
            default:
              return tokenize.call(context, effects, ok, nok)(code)
          }
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
        return ++j < list.length ? handleConstruct(list[j]!) : fail
      }
    }
  }

  /**
   * Consume a character code and move onto the next.
   *
   * @see {@linkcode Code}
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

  /* v8 ignore start */

  /**
   * Define a skip.
   *
   * @see {@linkcode DefineSkip}
   * @see {@linkcode Point}
   *
   * @todo test
   *
   * @this {void}
   *
   * @param {Pick<Point, 'column' | 'line'>} point
   *  Skip point
   * @return {undefined}
   */
  function defineSkip(
    this: void,
    point: Pick<Point, 'column' | 'line'>
  ): undefined {
    skips[point.line] = point.column
    return skip(), void debug('position: define skip: `%j`', point)
  }

  /* v8 ignore stop */

  /**
   * Start a new token.
   *
   * @see {@linkcode TokenFields}
   * @see {@linkcode TokenType}
   * @see {@linkcode Token}
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
    skip()

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
   * Check if end of stream has been reached.
   *
   * @this {void}
   *
   * @return {boolean}
   *  `true` if at end of stream, `false` otherwise
   */
  function eos(this: void): boolean {
    return chunks[chunks.length - 1] === codes.eof
  }

  /**
   * Close an open token.
   *
   * @see {@linkcode TokenType}
   * @see {@linkcode Token}
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
   * @see {@linkcode Code}
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
   * @see {@linkcode Place}
   *
   * @this {void}
   *
   * @return {Place}
   *  Current point in file, relative to {@linkcode start}
   */
  function now(this: void): Place {
    const { _index, column, line, offset } = place
    // eslint-disable-next-line sort-keys
    return { line, column, offset, _index }
  }

  /* v8 ignore start */

  /**
   * Discard results.
   *
   * @todo test
   *
   * @see {@linkcode Construct}
   * @see {@linkcode Info}
   *
   * @this {void}
   *
   * @param {Construct} construct
   *  The successful construct
   * @param {Info} info
   *  Info passed around
   * @return {undefined}
   */
  function onsuccessfulcheck(
    this: void,
    construct: Construct,
    info: Info
  ): undefined {
    return void info.restore()
  }

  /* v8 ignore stop */

  /**
   * Use results.
   *
   * @see {@linkcode Construct}
   * @see {@linkcode Info}
   *
   * @this {void}
   *
   * @param {Construct} construct
   *  Successful construct
   * @param {Info} info
   *  Info passed around
   * @return {undefined}
   */
  function onsuccessfulconstruct(
    this: void,
    construct: Construct,
    info: Info
  ): undefined {
    return void result(construct, info.from)
  }

  /**
   * Get the next `k`-th character code from the file without changing the
   * position of the tokenizer.
   *
   * @see {@linkcode Code}
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
   * @see {@linkcode Code}
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

    if ((options.eol ?? isLineEnding)(code)) {
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
   * Resolve events.
   *
   * @todo test resolve
   * @todo test resolveTo
   *
   * @see {@linkcode Construct}
   *
   * @this {void}
   *
   * @param {Construct} construct
   *  Construct to handle
   * @param {number} from
   *  Last event index
   * @return {undefined}
   */
  function result(this: void, construct: Construct, from: number): undefined {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct)
    }

    /* v8 ignore start */

    if (construct.resolve) {
      splice(
        context.events,
        from,
        context.events.length - from,
        construct.resolve(context.events.slice(from), context)
      )
    }

    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context)
    }

    /* v8 ignore stop */

    assert(
      /* v8 ignore next 3 */ !!construct.partial ||
        !context.events.length ||
        context.events[context.events.length - 1]![0] === ev.exit,
      'expected last token to end'
    )

    return void construct
  }

  /**
   * Move the current point a bit forward in the line when on a column skip.
   *
   * @todo test
   *
   * @this {void}
   *
   * @return {undefined}
   */
  function skip(this: void): undefined {
    /* v8 ignore next 4 */
    if (place.line in skips && place.column < 2) {
      place.column = skips[place.line]!
      place.offset += place.column - 1
    }

    return void place
  }

  /**
   * Get the string value of a slice of `chunks`.
   *
   * @see {@linkcode Chunk}
   *
   * @todo test string chunk
   *
   * @this {void}
   *
   * @param {Chunk[]} chunks
   *  Chunks to serialize
   * @param {boolean | null | undefined} [expandTabs]
   *  Whether to expand tabs
   * @return {string}
   *  String value of `chunks`
   */
  function serializeChunks(
    this: void,
    chunks: Chunk[],
    expandTabs?: boolean | null | undefined
  ): string {
    /**
     * Serialized character code array.
     *
     * @const {string[]} result
     */
    const result: string[] = []

    /**
     * Index of current chunk.
     *
     * @var {number} index
     */
    let index: number = -1

    /**
     * Current code represents horizontal tab?
     *
     * @var {boolean} tab
     */
    let tab: boolean = false

    while (++index < chunks.length) {
      /**
       * Current chunk.
       *
       * @const {Chunk} chunk
       */
      const chunk: Chunk = chunks[index] as Chunk

      /**
       * Current serialized chunk.
       *
       * @var {string} value
       */
      let value: string

      /* v8 ignore next 2 */ if (typeof chunk === 'string') {
        value = chunk
      } else {
        switch (chunk) {
          case codes.crlf:
            value = chars.crlf
            break
          case codes.vcr:
            value = chars.cr
            break
          case codes.vht:
            value = expandTabs ? chars.space : chars.ht
            break
          case codes.vlf:
            value = chars.lf
            break
          case codes.vs:
            if (!expandTabs && tab) continue
            value = chars.space
            break
          default:
            assert(typeof chunk === 'number', 'expected code point')
            value = String.fromCodePoint(chunk)
        }
      }

      tab = chunk === codes.vht
      result.push(value)
    }

    return result.join(chars.empty)
  }

  /**
   * Get the text spanning `range`.
   *
   * @see {@linkcode Position}
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
   * @see {@linkcode Code}
   * @see {@linkcode Position}
   *
   * @this {void}
   *
   * @param {Position} range
   *  Position in stream
   * @return {Code[]}
   *  List of chunks
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
     * @const {Construct | undefined} currentConstruct
     */
    const currentConstruct: Construct | undefined = context.currentConstruct

    /**
     * Current events length.
     *
     * @const {number} from
     */
    const from: number = context.events.length

    /**
     * Current place.
     *
     * @const {Place} lastPlace
     */
    const lastPlace: Place = now()

    /**
     * Current token stack.
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
      context.currentConstruct = currentConstruct
      context.events.length = from
      context.next = next
      context.previous = previous

      skip()
      return void debug('restore: %o', place)
    }
  }

  /**
   * Main loop to walk through {@linkcode chunks}.
   *
   * > 👉 **Note**: The {@linkcode read} method modifies `_index` in
   * > {@linkcode place} to advance the loop until end of stream.
   *
   * @this {void}
   *
   * @return {undefined}
   */
  function tokenize(this: void): undefined {
    while (place._index < chunks.length) go(peek(0))
    eos() && state && go(context.code)
    return void state
  }

  /**
   * Write a slice of chunks.
   *
   * The eof code (`null`) can be used to signal end of stream.
   *
   * @see {@linkcode Chunk}
   * @see {@linkcode Event}
   *
   * @this {void}
   *
   * @param {Chunk[]} slice
   *  The chunks to write
   * @return {Event[]}
   *  List of events
   */
  function write(this: void, slice: Chunk[]): Event[] {
    chunks = push(chunks, slice.flatMap(chunk => {
      /* v8 ignore next 2 */ return typeof chunk === 'string'
        ? preprocess(chunk)
        : chunk
    }))

    tokenize()

    // exit if not done, resolvers might change stuff
    /* v8 ignore next */ if (!eos()) return []

    result(initialize, 0)
    context.events = resolveAll(resolveAllConstructs, context.events, context)
    return context.events
  }
}

export default createTokenizer
