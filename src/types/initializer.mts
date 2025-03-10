/**
 * @file Type Aliases - Initializer
 * @module vfile-tokenizer/types/Initializer
 */

import type {
  Effects,
  State,
  TokenizeContext,
  Tokenizer
} from '@flex-development/vfile-tokenizer'

/**
 * Set up an initial state machine.
 *
 * > 👉 **Note**: Like a {@linkcode Tokenizer}, but without `ok` and `nok`.
 *
 * @see {@linkcode Effects}
 * @see {@linkcode State}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  Context object to transition state machine
 * @return {State}
 *  Initial state
 */
type Initializer = (this: TokenizeContext, effects: Effects) => State

export type { Initializer as default }
