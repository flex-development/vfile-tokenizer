/**
 * @file Test Utilities - finalizeMicromarkContext
 * @module tests/utils/finalizeMicromarkContext
 */

import type { TokenizeContext } from '@flex-development/fsm-tokenizer'

/**
 * Finalize the micromark tokenize `context`.
 *
 * @see {@linkcode TokenizeContext}
 *
 * @this {void}
 *
 * @param {TokenizeContext} context
 *  Base tokenize context
 * @return {undefined}
 */
function finalizeMicromarkContext(
  this: void,
  context: TokenizeContext
): undefined {
  // @ts-expect-error this is a custom field, which users are supposed to
  // manually type, but the runtime should just support it (2339).
  context.parser = {
    constructs: { disable: { null: [] } },
    defined: [],
    lazy: {}
  }

  return void context
}

export default finalizeMicromarkContext
