/**
 * @file Constructs - lineEnding
 * @module fixtures/constructs/lineEnding
 */

import type { Construct } from '@flex-development/vfile-tokenizer'
import * as micromark from 'micromark-core-commonmark'
import { markdownLineEnding } from 'micromark-util-character'

/**
 * Line ending construct.
 *
 * @const {Construct} lineEnding
 */
const lineEnding: Construct = {
  name: micromark.lineEnding.name,
  test: markdownLineEnding,

  // @ts-expect-error [2332] micromark tokenizers have custom fields, which
  // users are supposed to manually type.
  tokenize: micromark.lineEnding.tokenize
}

export default lineEnding
