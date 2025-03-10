/**
 * @file Utilities - isLineEnding
 * @module vfile-tokenizer/utils/isLineEnding
 */

import { codes } from '#enums/index'
import type { Code } from '@flex-development/vfile-tokenizer'

/**
 * Check if `code` is a character code representing a line ending.
 *
 * @see {@linkcode Code}
 *
 * @this {void}
 *
 * @param {Code} code
 *  The character code to check
 * @return {code is NonNullable<Code>}
 *  `true` if `code` is line ending code
 */
function isLineEnding(this: void, code: Code): code is NonNullable<Code> {
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

export default isLineEnding
