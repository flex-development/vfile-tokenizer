/**
 * @file Type Aliases - Exit
 * @module fsm-tokenizer/types/Exit
 */

import type { Token, TokenType } from '@flex-development/fsm-tokenizer'

/**
 * Close an open token.
 *
 * @see {@linkcode Token}
 * @see {@linkcode TokenType}
 *
 * @this {void}
 *
 * @param {TokenType} type
 *  Token type
 * @return {Token}
 *  Closed token
 */
type Exit = (this: void, type: TokenType) => Token

export type { Exit as default }
