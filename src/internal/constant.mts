/**
 * @file Internal - constant
 * @module vfile-tokenizer/internal/constant
 */

/**
 * Create a function that returns `value`.
 *
 * @internal
 *
 * @template {any} T
 *  Return value
 *
 * @this {void}
 *
 * @param {T} value
 *  Return value
 * @return {(this: void) => T}
 *  Function that returns `value` unchanged
 */
function constant<T>(this: void, value: T): (this: void) => T {
  return () => value
}

export default constant
