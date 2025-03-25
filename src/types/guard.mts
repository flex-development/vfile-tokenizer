/**
 * @file Type Aliases - Guard
 * @module fsm-tokenizer/types/Guard
 */

import type { Code, TokenizeContext } from '@flex-development/fsm-tokenizer'

/**
 * Check the given character `code`.
 *
 * @see {@linkcode Code}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  Character code to check
 * @return {boolean}
 *  `true` if `code` passes check, `false` otherwise
 */
type Guard = (this: TokenizeContext, code: Code) => boolean

export type { Guard as default }
