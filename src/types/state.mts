/**
 * @file Type Aliases - State
 * @module fsm-tokenizer/types/State
 */

import type { Code } from '@flex-development/fsm-tokenizer'

/**
 * The main unit in the state machine: a function that gets a character code and
 * has certain effects.
 *
 * A state function returns another function: the next state-as-a-function to go
 * to, or `undefined` when a final state is reached.
 *
 * @see {@linkcode Code}
 *
 * @this {void}
 *
 * @param {Code} code
 *  Th current character code
 * @return {State | undefined}
 *  Next state
 */
type State = (this: void, code: Code) => State | undefined

export type { State as default }
