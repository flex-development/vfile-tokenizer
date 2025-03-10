/**
 * @file Interfaces - Token
 * @module vfile-tokenizer/interfaces/Token
 */

import type {
  Code,
  TokenInfo,
  TokenType
} from '@flex-development/vfile-tokenizer'

/**
 * A span of one (`1`) or more character codes.
 *
 * Tokens are the core of what the lexer produces. Libraries and other tools can
 * turn them into different things.
 *
 * Tokens are essentially names attached to a slice of character codes, such as
 * `eof` for end of file, or `whitespace` for whitespace characters.
 *
 * Sometimes tokens need more info. This interface can be augmented to register
 * custom token fields.
 *
 * @example
 *  declare module '@flex-development/vfile-tokenizer' {
 *    interface Token {
 *      value?: string | null | undefined
 *    }
 *  }
 *
 * @see {@linkcode Code}
 * @see {@linkcode TokenInfo}
 * @see {@linkcode TokenType}
 *
 * @template {TokenType} [T=TokenType] - Token type
 *
 * @extends {TokenInfo}
 */
interface Token<T extends TokenType = TokenType> extends TokenInfo {
  /**
   * Token type.
   */
  type: T
}

export type { Token as default }
