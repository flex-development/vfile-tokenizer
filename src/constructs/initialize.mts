/**
 * @file Constructs - initialize
 * @module vfile-tokenizer/constructs/initialize
 */

import type {
  Code,
  Constructs,
  Effects,
  InitialConstruct,
  State,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'

/**
 * Create an initial construct.
 *
 * @see {@linkcode Constructs}
 * @see {@linkcode InitialConstruct}
 *
 * @param {Constructs} constructs
 *  Construct(s) to try
 * @return {InitialConstruct}
 *  Initial construct
 */
function initialize(constructs: Constructs): InitialConstruct {
  return { name: 'vfile-tokenizer:initialize', tokenize: initialize }

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
   * @return {State}
   *  Initial state
   */
  function initialize(this: TokenizeContext, effects: Effects): State {
    return state

    /**
     * Consume `code` and retry {@linkcode constructs}.
     *
     * @this {void}
     *
     * @param {Code} code
     *  Current character code
     * @return {State | undefined}
     *  Next state
     */
    function eat(this: void, code: Code): State | undefined {
      return effects.consume(code), state
    }

    /**
     * Try a construct.
     *
     * @this {void}
     *
     * @param {Code} code
     *  Current character code
     * @return {State | undefined}
     *  Next state
     */
    function state(this: void, code: Code): State | undefined {
      return effects.attempt(constructs, state, eat)(code)
    }
  }
}

export default initialize
