/**
 * @file Constructs - micromark
 * @module fixtures/constructs/micromark
 */

import codes from '#enums/codes'
import type { ConstructRecord } from '@flex-development/vfile-tokenizer'
import { codeFenced, codeIndented, codeText } from 'micromark-core-commonmark'

/**
 * Markdown construct record.
 *
 * @const {ConstructRecord} micromark
 */
const micromark: ConstructRecord = {
  [codes.vht]: codeIndented,
  [codes.vs]: codeIndented,
  [codes.space]: codeIndented,
  [codes.graveAccent]: [codeFenced, codeText],
  [codes.tilde]: codeFenced
  // micromark tokenizers have custom fields,
  // which users are supposed to manually type.
} as unknown as ConstructRecord

export default micromark
