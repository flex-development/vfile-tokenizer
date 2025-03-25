/**
 * @file Utilities - eof
 * @module fsm-tokenizer/utils/eof
 */

import codes from '#enums/codes'

/**
 * Check if `code` is a character code signaling the end of stream.
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {unknown} code
 *  The character code to check
 * @return {code is typeof codes.eof}
 *  `true` if `code` is {@linkcode codes.eof}, `false` otherwise
 */
function eof(this: void, code: unknown): code is typeof codes.eof {
  return code === codes.eof
}

export default eof
