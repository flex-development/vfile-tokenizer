/**
 * @file Integration Tests - tokenize
 * @module vfile-tokenizer/tests/integration/tokenize
 */

import initialize from '#constructs/initialize'
import createTokenizer from '#create-tokenizer'
import chars from '#enums/chars'
import codes from '#enums/codes'
import cli from '#fixtures/constructs/cli'
import digit from '#fixtures/constructs/digit'
import end from '#fixtures/constructs/end'
import longFlag from '#fixtures/constructs/flag-long'
import letter from '#fixtures/constructs/letter'
import lineEnding from '#fixtures/constructs/line-ending'
import micromark from '#fixtures/constructs/micromark'
import shortcode from '#fixtures/constructs/shortcode'
import streamBreak from '#fixtures/constructs/stream-break'
import constant from '#internal/constant'
import toList from '#internal/to-list'
import createPreprocess from '#preprocess'
import finalizeMicromarkContext from '#tests/utils/finalize-micromark-context'
import snapshot from '#tests/utils/snapshot-events'
import testSubject from '#tokenize'
import pathe from '@flex-development/pathe'
import { isNIL, type Fn } from '@flex-development/tutils'
import type {
  Code,
  Consume,
  Enter,
  Event,
  Exit,
  FileLike,
  List,
  Preprocess,
  TokenizeContext,
  TokenizeOptions,
  Value
} from '@flex-development/vfile-tokenizer'
import { readSync as read } from 'to-vfile'
import type { MockInstance } from 'vitest'

describe('integration:tokenize', () => {
  type Consumed = Fn<[Raw, (TokenizeOpts | null | undefined)?], Code[]>
  type Raw = List<RawChunk> | RawChunk | null | undefined
  type RawChunk = FileLike | Value
  type TokenizeOpts = Partial<TokenizeOptions>

  let consumedCodes: Consumed

  beforeAll(() => {
    /**
     * @this {void}
     *
     * @param {Raw} value
     *  The file, value, or list of files and/or values to tokenize
     * @param {TokenizeOpts | null | undefined} [options]
     *  Options for tokenizing
     * @return {Code[]}
     *  Expected character codes
     */
    consumedCodes = function consumed(
      this: void,
      value: Raw,
      options?: TokenizeOpts | null | undefined
    ): Code[] {
      /**
       * Turn a value into character code chunks.
       *
       * @const {Preprocess} preprocess
       */
      const preprocess: Preprocess = createPreprocess(options)

      /**
       * List of expected character codes.
       *
       * @const {Code[]} expected
       */
      const expected: Code[] = []

      /**
       * List of raw values.
       *
       * @const {RawChunk[]} values
       */
      const values: RawChunk[] = toList(value).filter(v => !isNIL(v))

      if (!values.length) {
        expected.push(codes.eof)
      } else {
        expected.push(...values.flatMap((value, i, array) => {
          /**
           * Whether this is the end of the stream.
           *
           * @const {boolean} end
           */
          const end: boolean = i === array.length - 1

          /**
           * Expected character codes.
           *
           * @const {Code[]} chunks
           */
          const chunks: Code[] = preprocess(value, options?.encoding, end)

          if (String(value) === chars.empty) chunks.unshift(codes.empty)
          if (options?.breaks && !end) chunks.push(codes.break)

          return chunks
        }))
      }

      return expected
    }
  })

  describe.each<[value: Raw, options?: TokenizeOpts | null | undefined]>([
    [[]],
    [[], { breaks: true }],
    [chars.empty],
    [chars.empty, { breaks: true }],
    [[chars.empty, chars.empty, chars.empty]],
    [[chars.digit0, chars.digit1, chars.digit2, { value: chars.digit3 }]],
    [[chars.lowercaseA, chars.ht, Buffer.from(chars.empty), chars.lowercaseB]],
    [[Buffer.from('hello'), Buffer.from('world')], { breaks: true }]
  ])('consume without constructs (%#)', (value, options) => {
    let consume: MockInstance<Consume>
    let enter: MockInstance<Enter>
    let exit: MockInstance<Exit>
    let result: Event[]
    let tokenizer: TokenizeContext

    beforeEach(() => {
      tokenizer = createTokenizer({
        debug: pathe.basename(import.meta.url),
        encoding: options?.encoding,
        initial: initialize([])
      })

      consume = vi.spyOn(tokenizer.effects, 'consume')
      enter = vi.spyOn(tokenizer.effects, 'enter')
      exit = vi.spyOn(tokenizer.effects, 'exit')

      tokenizer.breaks = options?.breaks
      result = testSubject(value, tokenizer)
    })

    it('should consume all character codes', () => {
      expect(consume.mock.calls.flat()).to.eql(consumedCodes(value, options))
    })

    it('should not produce any events', () => {
      expect(enter).not.toHaveBeenCalled()
      expect(exit).not.toHaveBeenCalled()
      expect(tokenizer).to.have.property('events', result)
      expect(tokenizer).to.have.nested.property('events.length', 0)
    })
  })

  describe('user constructs', () => {
    let debug: string

    beforeAll(() => {
      debug = pathe.basename(import.meta.url)
    })

    describe('all constructs fail', () => {
      let consume: MockInstance<Consume>
      let enter: MockInstance<Enter>
      let exit: MockInstance<Exit>
      let result: Event[]
      let tokenizer: TokenizeContext
      let value: Value[]

      beforeAll(() => {
        value = [
          Buffer.from(chars.lowercaseA + chars.lowercaseB),
          Buffer.from(chars.lowercaseC + chars.lowercaseD),
          Buffer.from(chars.lowercaseE)
        ]
      })

      beforeEach(() => {
        tokenizer = createTokenizer({
          debug,
          disabled: [letter.name!],
          initial: initialize({
            [codes.break]: streamBreak,
            [codes.lowercaseB]: letter,
            null: [letter, digit]
          })
        })

        consume = vi.spyOn(tokenizer.effects, 'consume')
        enter = vi.spyOn(tokenizer.effects, 'enter')
        exit = vi.spyOn(tokenizer.effects, 'exit')

        result = testSubject(value, tokenizer)
      })

      it('should consume all character codes', () => {
        expect(consume.mock.calls.flat()).to.eql(consumedCodes(value))
      })

      it('should not produce any events', () => {
        expect(enter).not.toHaveBeenCalled()
        expect(exit).not.toHaveBeenCalled()
        expect(tokenizer).to.have.property('events', result)
        expect(tokenizer).to.have.nested.property('events.length', 0)
      })
    })

    describe('all constructs succeed', () => {
      let breaks: boolean
      let consume: MockInstance<Consume>
      let consumed: Code[]
      let enter: MockInstance<Enter>
      let exit: MockInstance<Exit>
      let result: Event[]
      let tokenizer: TokenizeContext
      let value: Value[]

      beforeAll(() => {
        value = [
          chars.lowercaseA,
          chars.digit1,
          chars.lowercaseB,
          chars.digit2,
          Buffer.from(chars.lowercaseC + chars.digit3)
        ]

        breaks = true
        consumed = consumedCodes(value, { breaks })
      })

      beforeEach(() => {
        tokenizer = createTokenizer({
          initial: initialize({
            [codes.lowercaseA]: letter,
            [codes.digit1]: digit,
            null: [digit, letter, streamBreak, end]
          }),
          moveOnBreak: true
        })

        consume = vi.spyOn(tokenizer.effects, 'consume')
        enter = vi.spyOn(tokenizer.effects, 'enter')
        exit = vi.spyOn(tokenizer.effects, 'exit')

        tokenizer.breaks = breaks
        result = testSubject(value, tokenizer)
      })

      it('should consume all character codes', () => {
        expect(consume.mock.calls.flat()).to.eql(consumed)
      })

      it('should produce events', () => {
        expect(enter).toHaveBeenCalledTimes(consumed.length)
        expect(exit).toHaveBeenCalledTimes(consumed.length)
        expect(tokenizer).to.have.property('events', result)
        expect(tokenizer.events).to.have.property('length').gte(2)
        expect(snapshot(result)).toMatchSnapshot()
      })
    })

    describe.each<[value: Raw, options: TokenizeOptions]>([
      [chars.ht + chars.lf + chars.crlf, { initial: initialize(lineEnding) }],
      ['--standalone=', { initial: constant(initialize(cli)) }],
      [['--max='], { initial: initialize([longFlag]) }],
      [
        ['--debug', '--color=3'],
        {
          initial: initialize(cli),
          moveOnBreak: true
        }
      ],
      [
        read('__fixtures__/gemoji.txt'),
        {
          initial: initialize({ [codes.colon]: shortcode })
        }
      ],
      [
        read('__fixtures__/markdown/code-indented.md'),
        {
          finalizeContext: finalizeMicromarkContext,
          initial: initialize(micromark)
        }
      ],
      [
        read('__fixtures__/markdown/code-text.md'),
        {
          finalizeContext: finalizeMicromarkContext,
          initial: constant(initialize(micromark))
        }
      ]
    ])('at least one construct succeeds (%#)', (value, options) => {
      let consume: MockInstance<Consume>
      let enter: MockInstance<Enter>
      let exit: MockInstance<Exit>
      let result: Event[]
      let tokenizer: TokenizeContext

      beforeEach(() => {
        tokenizer = createTokenizer({
          ...options,
          debug: pathe.basename(import.meta.url)
        })

        consume = vi.spyOn(tokenizer.effects, 'consume')
        enter = vi.spyOn(tokenizer.effects, 'enter')
        exit = vi.spyOn(tokenizer.effects, 'exit')

        tokenizer.breaks = options.breaks
        result = testSubject(value, tokenizer)
      })

      it('should consume all character codes', () => {
        // Arrange
        const consumed: Code[] = consumedCodes(value, options)

        // Expect
        expect(consume.mock.calls.length).to.be.gte(consumed.length)
        expect(consume.mock.calls.flat()).to.include.members(consumed)
      })

      it('should produce events', () => {
        expect(enter).toHaveBeenCalled()
        expect(exit).toHaveBeenCalled()
        expect(tokenizer).to.have.property('events', result)
        expect(tokenizer.events).to.have.property('length').gte(2)
        expect(snapshot(result)).toMatchSnapshot()
      })
    })
  })
})
