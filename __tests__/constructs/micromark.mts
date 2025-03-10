/**
 * @file Constructs - micromark
 * @module tests/constructs/micromark
 */

import { codes } from '#enums/index'
import codeFenced from '#tests/constructs/code-fenced'
import codeText from '#tests/constructs/code-text'
import eof from '#tests/constructs/eof'
import htmlFlow from '#tests/constructs/html-flow'
import type { ConstructRecord } from '@flex-development/vfile-tokenizer'
import { codeIndented, hardBreakEscape } from 'micromark-core-commonmark'

/**
 * Markdown construct record.
 *
 * @const {ConstructRecord} micromark
 */
const micromark: ConstructRecord = {
  [codes.lt]: htmlFlow,
  [codes.vht]: codeIndented,
  [codes.vs]: codeIndented,
  [codes.space]: codeIndented,
  [codes.graveAccent]: [codeFenced, codeText],
  [codes.tilde]: codeFenced,
  [codes.backslash]: hardBreakEscape,
  null: [eof]
} as unknown as ConstructRecord

export default micromark
