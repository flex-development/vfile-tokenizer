/**
 * @file Integration Tests - tokenize
 * @module vfile-tokenizer/tests/integration/tokenize
 */

import initialize from '#constructs/initialize'
import chars from '#enums/chars'
import codes from '#enums/codes'
import cli from '#fixtures/constructs/cli'
import longFlag from '#fixtures/constructs/flag-long'
import lineEnding from '#fixtures/constructs/line-ending'
import micromark from '#fixtures/constructs/micromark'
import operand from '#fixtures/constructs/operand'
import shortcode from '#fixtures/constructs/shortcode'
import constant from '#internal/constant'
import finalizeMicromarkContext from '#tests/utils/finalize-micromark-context'
import testSubject from '#tokenize'
import pathe from '@flex-development/pathe'
import type { Fn } from '@flex-development/tutils'
import type {
  Event,
  EventType,
  FileLike,
  List,
  Options,
  Token,
  Value
} from '@flex-development/vfile-tokenizer'
import pkg from '@flex-development/vfile-tokenizer/package.json'
import { readSync as read } from 'to-vfile'

describe('integration:tokenize', () => {
  let debug: string
  let snapshot: Fn<[Event[]], [EventType, Token][]>

  beforeAll(() => {
    debug = pathe.basename(import.meta.url)

    /**
     * @this {void}
     *
     * @param {Event[]} events
     *  List of events
     * @return {[EventType, Token][]}
     *  List of event types and tokens
     */
    snapshot = function snapshot(
      this: void,
      events: Event[]
    ): [EventType, Token][] {
      return events.map(event => [event[0], event[1]])
    }
  })

  it.each<[
    value: FileLike | List<FileLike | Value> | Value | null | undefined,
    options?: Partial<Options> | null | undefined
  ]>([
    [['hello', 'world']],
    [read('__fixtures__/markdown/code-fenced.md'), { tabSize: 2 }]
  ])('should work without constructs (%#)', (value, options) => {
    // Act
    const result = testSubject(value, { ...options, initial: initialize({}) })

    // Expect
    expect(result).to.be.an('array').that.is.empty
  })

  it.each<Parameters<typeof testSubject>>([
    [chars.lf + chars.crlf, { initial: initialize(lineEnding) }],
    ['--standalone=', { initial: initialize(cli) }],
    [['--debug', '--color=3'], { initial: initialize(cli), moveOnBreak: true }],
    [['--max=', chars.digit0], { initial: initialize([longFlag, operand]) }],
    [['--project', pkg.name], { initial: initialize(cli) }],
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
  ])('should work with constructs (%#)', (value, options) => {
    // Act
    const result = testSubject(value, { ...options, debug })

    // Expect
    expect(result).to.be.an('array').with.property('length').gte(2)
    expect(snapshot(result)).toMatchSnapshot()
  })
})
