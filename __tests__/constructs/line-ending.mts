/**
 * @file Constructs - lineEnding
 * @module tests/constructs/lineEnding
 */

import resolveSlice from '#utils/resolve-slice'
import type { Construct, Tokenizer } from '@flex-development/vfile-tokenizer'
import * as micromark from 'micromark-core-commonmark'
import { markdownLineEnding } from 'micromark-util-character'

/**
 * Line ending construct.
 *
 * @const {Construct} lineEnding
 */
const lineEnding: Construct = {
  name: micromark.lineEnding.name,
  resolve: resolveSlice,
  test: markdownLineEnding,
  tokenize: micromark.lineEnding.tokenize as unknown as Tokenizer
}

export default lineEnding
