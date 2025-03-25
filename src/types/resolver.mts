/**
 * @file Type Aliases - Resolver
 * @module fsm-tokenizer/types/Resolver
 */

import type {
  Construct,
  Event,
  TokenizeContext
} from '@flex-development/fsm-tokenizer'

/**
 * Handle events coming from `tokenize`.
 *
 * @see {@linkcode Construct.tokenize}
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeContext}
 *
 * @this {void}
 *
 * @param {Event[]} events
 *  List of events
 * @param {TokenizeContext} context
 *  Tokenize context
 * @return {Event[]}
 *  List of changed events
 */
type Resolver = (
  this: void,
  events: Event[],
  context: TokenizeContext
) => Event[]

export type { Resolver as default }
