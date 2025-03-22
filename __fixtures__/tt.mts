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
  break = 'break',
  digit = 'digit',
  end = 'end',
  flag = 'flag',
  id = 'id',
  letter = 'letter',
  lineEnding = 'lineEnding',
  operand = 'operand',
  shortcode = 'shortcode'
}

export default tt
