/**
 * @file Type Aliases - Event
 * @module vfile-tokenizer/types/Event
 */

import type {
  EventType,
  Token,
  TokenizeContext,
  TokenType
} from '@flex-development/vfile-tokenizer'

/**
 * The start or end of a token amongst other events.
 *
 * Tokens can "contain" other tokens, even though they are stored in a linked
 * list, by `enter`ing before and `exit`ing after them.
 *
 * @see {@linkcode EventType}
 * @see {@linkcode Token}
 * @see {@linkcode TokenType}
 * @see {@linkcode TokenizeContext}
 *
 * @template {TokenType} [T=TokenType]
 *  Token type
 */
type Event<T extends TokenType = TokenType> = [
  event: EventType,
  token: Token<T>,
  context: TokenizeContext
]

export type { Event as default }
