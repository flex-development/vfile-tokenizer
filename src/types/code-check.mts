/**
 * @file Type Aliases - CodeCheck
 * @module vfile-tokenizer/types/CodeCheck
 */

import type { Code } from '@flex-development/vfile-tokenizer'

/**
 * Check whether a character `code` passes a test.
 *
 * @see {@linkcode Code}
 *
 * @this {void}
 *
 * @param {Code} code
 *  Character code to check
 * @return {boolean}
 *  `true` if `code` passes test, `false` otherwise
 */
type CodeCheck = (this: void, code: Code) => boolean

export type { CodeCheck as default }
