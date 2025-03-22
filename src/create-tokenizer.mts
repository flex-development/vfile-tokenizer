/**
 * @file createTokenizer
 * @module vfile-tokenizer/createTokenizer
 */

import codes from '#enums/codes'
import constants from '#enums/constants'
import ev from '#enums/ev'
import constant from '#internal/constant'
import createDefineSkip from '#internal/create-define-skip'
import disabled from '#internal/disabled'
import noop from '#internal/noop'
import onsuccessfulcheck from '#internal/onsuccessfulcheck'
import skip from '#internal/skip'
import toList from '#internal/to-list'
import preprocess from '#preprocess'
import eos from '#utils/eof'
import eol from '#utils/eol'
import isCode from '#utils/is-code'
import push from '#utils/push'
import resolveAll from '#utils/resolve-all'
import serializeChunks from '#utils/serialize-chunks'
import sliceChunks from '#utils/slice-chunks'
import splice from '#utils/splice'
import tab from '#utils/tab'
import { u } from '@flex-development/unist-util-builder'
import { Location } from '@flex-development/vfile-location'
import type {
  Attempt,
  Chunk,
  Code,
  Column,
  Construct,
  ConstructRecord,
  Constructs,
  Effects,
  Event,
  Guard,
  Info,
  InitialConstruct,
  Line,
  List,
  Options,
  Place,
  Range,
  ReturnHandle,
  SerializeOptions,
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
   * List of chunks.
   *
   * @var {Chunk[]} chunks
   */
  let chunks: Chunk[] = []

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
   * Last buffer chunk index.
   *
   * @var {number} lastBufferIndex
   */
  let lastBufferIndex: number = -1

  /**
   * State and tools for resolving and serializing.
   *
   * @var {TokenizeContext} context
   */
  let context: TokenizeContext = Object.defineProperties({
    code: codes.eof,
    currentConstruct: undefined,
    defineSkip: createDefineSkip(place, skips, debug),
    effects,
    encoding: options.encoding,
    events: [],
    now,
    preprocess: options.preprocess ?? preprocess(),
    previous: codes.eof,
    serializeChunks,
    sliceSerialize,
    sliceStream,
    token,
    write
  }, {
    effects: {
      configurable: false,
      enumerable: false,
      writable: false
    }
  })

  place._bufferIndex = lastBufferIndex
  place._index = 0

  context = options.finalizeContext?.(context) ?? context
  onsuccessfulconstruct(initialize)

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
       * The current construct.
       *
       * @var {Construct} currentConstruct
       */
      let currentConstruct: Construct

      /**
       * Internal state.
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
       *  The list of constructs to try
       * @return {State}
       *  Next state
       */
      function handleConstructList(this: void, constructs: Construct[]): State {
        list = constructs
        j = 0

        if (!constructs.length) {
          assert(fail, 'expected `fail` to be given')
          return fail
        }

        assert(constructs[j], 'expected `constructs[j]`')
        return handleConstruct(constructs[j]!)
      }

      /**
       * Handle an object mapping codes to constructs.
       *
       * @this {void}
       *
       * @param {ConstructRecord} map
       *  The record of constructs to try
       * @return {State}
       *  Next state
       */
      function handleConstructRecord(this: void, map: ConstructRecord): State {
        return record

        /**
         * @this {void}
         *
         * @param {Code} code
         *  The current character code
         * @return {State | undefined}
         *  Next state
         */
        function record(this: void, code: Code): State | undefined {
          /**
           * List of constructs to try.
           *
           * @const {Construct[]} list
           */
          const list: Construct[] = []

          code !== codes.eof && map[code] && list.push(...toList(map[code]))
          map.null && list.push(...toList(map.null))

          return handleConstructList(list)(code)
        }
      }

      /**
       * Handle a single construct.
       *
       * @this {void}
       *
       * @param {Construct} construct
       *  The construct to try
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
          debug('start: %o', code)

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

          if (
            disabled(options.disabled, construct.name) ||
            !previous.call(context, context.previous) ||
            !test.call(context, code)
          ) {
            return nok(code)
          }

          return construct.tokenize.call(
            context,
            context.effects,
            ok,
            nok
          )(code)
        }
      }

      /**
       * State to go on successful tokenization.
       *
       * @this {void}
       *
       * @param {Code} code
       *  The current character code
       * @return {State}
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

        if (++j < list.length) {
          assert(list[j], 'expected construct')
          return handleConstruct(list[j]!)
        }

        return fail
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
    debug('consume: `%o`; previous: `%o`', code, context.previous)
    assert(consumed === null, 'expected unconsumed code')

    if ((options.eol ?? eol)(code)) {
      place.column = 1
      place.line++
      place.offset += code === codes.crlf ? 2 : 1
      skip(place, skips)
      debug('position after eol: %o', place)
    } else if (tab(code)) {
      place.column += options.tabSize ?? constants.tabSize
      if (code < 0) place.offset++
    } else if (code !== codes.eof && code !== codes.vs) {
      if (code !== codes.break || options.moveOnBreak) {
        place.column++
        place.offset++
      }
    }

    if (place._bufferIndex < 0) { // not in a buffer chunk.
      place._index++
    } else { // inside buffer chunk.
      lastBufferIndex = ++place._bufferIndex

      /**
       * Current chunk.
       *
       * @const {Chunk | undefined} chunk
       */
      const chunk: Chunk | undefined = chunks[place._index]

      assert(Array.isArray(chunk), 'expected buffer chunk')

      // at end of buffer chunk.
      // points with non-negative `_bufferIndex` values reference strings.
      if (lastBufferIndex === chunk.length) {
        place._index++
        place._bufferIndex = -1
      }
    }

    context.previous = code
    context.code = peek()

    debug('context.code: `%o`', context.code)
    return consumed = true, void code
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
      start: now(), // eslint-disable-next-line sort-keys
      end: now(),
      ...fields
    })

    assert(typeof type === 'string', 'expected `type` to be a string')
    assert(type.length > 0, 'expected `type` to be a non-empty string')
    debug('enter: `%s`; %o', type, token.start)

    // add enter event and push `token` onto the `stack`.
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

    // close token.
    token.end = now()

    // empty token.
    if (
      token.start._index === token.end._index &&
      token.start._bufferIndex === token.end._bufferIndex
    ) {
      if (
        token.start._bufferIndex < 0 &&
        Array.isArray(chunks[token.start._index - 1])
      ) { // empty token closed at the end of buffer chunk.
        token.start._index = token.end._index - 1
        token.start._bufferIndex = lastBufferIndex
      }
    }

    debug('exit: `%s`; %o', token.type, token.end)

    // add exit event.
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
    return state = state(code), void code
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
    const { _bufferIndex, _index, column, line, offset } = place
    // eslint-disable-next-line sort-keys
    return { line, column, offset, _index, _bufferIndex }
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
   * Get the next character code from the file without changing the position of
   * the tokenizer.
   *
   * @this {void}
   *
   * @return {Code}
   *  Peeked character code
   */
  function peek(this: void): Code {
    /**
     * Peeked character code.
     *
     * @var {Code} code
     */
    let code: Code | undefined

    if (place._index < chunks.length) {
      /**
       * The current chunk.
       *
       * @const {Chunk | undefined} chunk
       */
      const chunk: Chunk | undefined = chunks[place._index]

      assert(chunk !== undefined, 'expected `chunk`')

      if (!Array.isArray(chunk)) { // not in buffer chunk.
        assert(place._bufferIndex < 0, 'expected negative `_bufferIndex`')
        code = chunk
      } else { // in or at end of buffer chunk.
        code = chunk[place._bufferIndex]
      }
    }

    return isCode(code) ? code : eos(chunks.at(-1)) ? codes.eof : codes.break
  }

  /**
   * Get the text spanning `range`.
   *
   * @this {void}
   *
   * @param {Range} range
   *  Position in stream
   * @param {SerializeOptions | boolean | null | undefined} [options]
   *  Options for serializing or whether to expand tabs
   * @return {string}
   *  Serialized slice
   */
  function sliceSerialize(
    this: void,
    range: Range,
    options?: SerializeOptions | boolean | null | undefined
  ): string {
    return context.serializeChunks(context.sliceStream(range), options)
  }

  /**
   * Get the chunks spanning `range`.
   *
   * @this {void}
   *
   * @param {Range} range
   *  Position in stream
   * @return {Chunk[]}
   *  Chunks in stream spanning `range`
   */
  function sliceStream(this: void, range: Range): Chunk[] {
    return sliceChunks(chunks, range)
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
      context.previous = previous

      lastBufferIndex = place._bufferIndex

      return skip(place, skips), void debug('restore: %o', place)
    }
  }

  /**
   * Main loop to walk through {@linkcode chunks}.
   *
   * > 👉 **Note**: The {@linkcode consume} method modifies `bufferIndex` and
   * > `_index` in {@linkcode place} to advance the loop until end of stream.
   *
   * @this {void}
   *
   * @return {undefined}
   */
  function tokenize(this: void): undefined {
    while (place._index < chunks.length) {
      const { _index: chunkIndex } = now()

      /**
       * The current chunk.
       *
       * @const {Chunk | undefined} chunk
       */
      const chunk: Chunk | undefined = chunks[chunkIndex]

      // deal with character code chunk.
      if (isCode(chunk)) {
        go(chunk)
        continue
      }

      assert(chunk !== undefined, 'expected `chunk`')

      // normalize buffer index to loop through buffer chunk.
      if (place._bufferIndex < 0) place._bufferIndex = 0

      // loop through buffer chunk to deal with character codes.
      while (place._index === chunkIndex && place._bufferIndex < chunk.length) {
        /**
         * Current character code.
         *
         * @const {Code | undefined} code
         */
        const code: Code | undefined = chunk[place._bufferIndex]

        // deal with character code.
        assert(code !== undefined, 'expected `chunk[place._bufferIndex]`')
        go(code)
      }
    }

    return void state
  }

  /**
   * Write a slice of chunks.
   *
   * The eof code (`null`) can be used to signal end of stream.
   *
   * @this {void}
   *
   * @param {Chunk | List<Chunk | Value> | Value} slice
   *  The chunk, value, or list of chunks and/or values to write
   * @return {Event[]}
   *  List of events
   */
  function write(
    this: void,
    slice: Chunk | List<Chunk | Value> | Value
  ): Event[] {
    chunks = push(chunks, toList(slice).map(value => {
      // raw chunk.
      if (!Array.isArray(value) && !isCode(value)) {
        value = context.preprocess(value, options.encoding)
      }

      // empty buffer chunk.
      if (Array.isArray(value) && !value.length) value = codes.empty

      return value
    }))

    // run constructs on new chunks.
    tokenize()

    // exit if not done, resolvers might change stuff.
    if (!eos(chunks.at(-1))) return []

    // resolve events.
    onsuccessfulconstruct(initialize, { from: 0 })
    context.events = resolveAll(resolveAlls, context.events, context)

    return context.events
  }
}

export default createTokenizer
