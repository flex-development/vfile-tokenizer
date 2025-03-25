/**
 * @file Type Aliases - FinalizeContext
 * @module fsm-tokenizer/types/FinalizeContext
 */

import type { TokenizeContext } from '@flex-development/fsm-tokenizer'

/**
 * Finalize the tokenize context.
 *
 * @see {@linkcode TokenizeContext}
 *
 * @this {void}
 *
 * @param {TokenizeContext} context
 *  Base tokenize context
 * @return {TokenizeContext | null | undefined}
 *  Final context
 */
type FinalizeContext = (
  this: void,
  context: TokenizeContext
) => TokenizeContext | null | undefined

export type { FinalizeContext as default }
