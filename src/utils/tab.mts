/**
 * @file Utilities - tab
 * @module fsm-tokenizer/utils/tab
 */

import codes from '#enums/codes'
import type { Code } from '@flex-development/fsm-tokenizer'

/**
 * Check if `code` is a character code representing a horizontal tab.
 *
 * @see {@linkcode Code}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {unknown} code
 *  The character code to check
 * @return {code is typeof codes.ht | typeof codes.vht}
 *  `true` if `code` is horizontal tab code, `false` otherwise
 */
function tab(
  this: void,
  code: unknown
): code is typeof codes.ht | typeof codes.vht {
  return code === codes.ht || code === codes.vht
}

export default tab
