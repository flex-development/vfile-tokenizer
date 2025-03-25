/**
 * @file Type Aliases - TokenFactory
 * @module fsm-tokenizer/types/TokenFactory
 */

import type {
  Token,
  TokenInfo,
  TokenType
} from '@flex-development/fsm-tokenizer'

/**
 * Create a new token.
 *
 * @see {@linkcode Token}
 * @see {@linkcode TokenInfo}
 * @see {@linkcode TokenType}
 *
 * @this {void}
 *
 * @param {TokenType} type
 *  Token type
 * @param {TokenInfo} info
 *  Token info
 * @return {Token}
 *  New token
 */
type TokenFactory = (this: void, type: TokenType, info: TokenInfo) => Token

export type { TokenFactory as default }
