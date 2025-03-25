/**
 * @file Type Aliases - Tokenizer
 * @module fsm-tokenizer/types/Tokenizer
 */

import type {
  Effects,
  State,
  TokenizeContext
} from '@flex-development/fsm-tokenizer'

/**
 * Set up a state machine to handle character codes streaming in.
 *
 * @see {@linkcode Effects}
 * @see {@linkcode State}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  Context object to transition state machine
 * @param {State} ok
 *  Successful tokenization state
 * @param {State} nok
 *  Failed tokenization state
 * @return {State}
 *  Initial state
 */
type Tokenizer = (
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
) => State

export type { Tokenizer as default }
