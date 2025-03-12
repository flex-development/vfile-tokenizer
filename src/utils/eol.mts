/**
 * @file Utilities - eol
 * @module vfile-tokenizer/utils/eol
 */

import codes from '#enums/codes'
import type { Code } from '@flex-development/vfile-tokenizer'

/**
 * Check if `code` is a character code representing a line ending.
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
 * @return {code is NonNullable<Code>}
 *  `true` if `code` is line ending code, `false` otherwise
 */
function eol(this: void, code: unknown): code is NonNullable<Code> {
  switch (code) {
    case codes.cr:
    case codes.crlf:
    case codes.lf:
    case codes.ls:
    case codes.ps:
    case codes.vcr:
    case codes.vlf:
      return true
    default:
      return false
  }
}

export default eol
