/**
 * @file Type Aliases - Enter
 * @module fsm-tokenizer/types/Enter
 */

import type {
  Token,
  TokenFields,
  TokenType
} from '@flex-development/fsm-tokenizer'

/**
 * Start a new token.
 *
 * @see {@linkcode Token}
 * @see {@linkcode TokenFields}
 * @see {@linkcode TokenType}
 *
 * @this {void}
 *
 * @param {TokenType} type
 *  Token type
 * @param {TokenFields | null | undefined} [fields]
 *  Token fields
 * @return {Token}
 *  Open token
 */
type Enter = (
  this: void,
  type: TokenType,
  fields?: TokenFields | null | undefined
) => Token

export type { Enter as default }
