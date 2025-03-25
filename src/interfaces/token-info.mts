/**
 * @file Interfaces - TokenInfo
 * @module fsm-tokenizer/interfaces/TokenInfo
 */

import type {
  Position,
  Token,
  TokenFields
} from '@flex-development/fsm-tokenizer'

/**
 * Token data.
 *
 * @see {@linkcode Position}
 * @see {@linkcode TokenFields}
 *
 * @extends {Position}
 * @extends {TokenFields}
 */
interface TokenInfo extends Position, TokenFields {
  /**
   * Next token.
   *
   * @see {@linkcode Token}
   */
  next?: Token | undefined

  /**
   * Previous token.
   *
   * @see {@linkcode Token}
   */
  previous?: Token | undefined
}

export type { TokenInfo as default }
