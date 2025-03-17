/**
 * @file Internal - sliceable
 * @module vfile-tokenizer/internal/sliceable
 */

/**
 * Check if `value` is an array or string.
 *
 * @internal
 *
 * @template {any} T
 *  Array item type
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is T[] | string}
 *  `true` if `value` is an array or string, `false` otherwise
 */
function sliceable<T>(
  this: void,
  value: unknown
): value is T[] | string {
  return typeof value === 'string' || Array.isArray(value)
}

export default sliceable
