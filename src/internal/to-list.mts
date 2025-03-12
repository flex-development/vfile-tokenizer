/**
 * @file Internal - toList
 * @module vfile-tokenizer/internal/toList
 */

import isList from '#internal/is-list'
import type { List } from '@flex-development/vfile-tokenizer'

export default toList

/**
 * Convert `T` to a list.
 *
 * @internal
 *
 * @template {any} T
 *  The value to convert
 */
type ToList<T> = T extends List ? T : T[]

/**
 * Convert `value` to a list.
 *
 * @internal
 *
 * @template {any} T
 *  The value to convert
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The value to convert
 * @return {ToList<T>}
 *  `value` or array containing `value`
 */
function toList<T>(this: void, value: T): ToList<T> {
  return (isList(value) ? value : [value]) as ToList<T>
}
