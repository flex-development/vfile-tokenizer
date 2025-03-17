/**
 * @file Fixtures - tt
 * @module fixtures/tt
 */

import type { TokenType } from '@flex-development/vfile-tokenizer'

/**
 * Token types.
 *
 * @enum {TokenType}
 */
enum tt {
  eof = 'eof',
  flag = 'flag',
  id = 'id',
  lineEnding = 'lineEnding',
  operand = 'operand',
  shortcode = 'shortcode'
}

export default tt
