/**
 * @file Internal - nil
 * @module fsm-tokenizer/internal/nil
 */

/**
 * Check if `value` is `null` or `undefined` (`NIL`).
 *
 * @internal
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is null | undefined}
 *  `true` if `value` is `NIL`, `false` otherwise
 */
function nil(this: void, value: unknown): value is null | undefined {
  return value === null || value === undefined
}

export default nil
