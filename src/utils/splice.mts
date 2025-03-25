/**
 * @file Utilities - splice
 * @module fsm-tokenizer/utils/splice
 */

import constants from '#enums/constants'
import type { List, Numeric } from '@flex-development/fsm-tokenizer'

/**
 * Remove items from `list` and, if necessary, insert new `items` in their
 * place, returning the deleted elements.
 *
 * > 👉 **Note**: {@linkcode Array.splice} takes all items to be inserted as
 * > individual arguments which causes a stack overflow in V8 when trying to
 * > insert a large number of items (i.e. 100k).
 *
 * @see {@linkcode List}
 *
 * @category
 *  utils
 *
 * @template {unknown} T
 *  List item type
 *
 * @this {void}
 *
 * @param {T[]} list
 *  The list to operate on
 * @param {Numeric | number} start
 *  The index in `list` to remove/ and/or insert items at (can be negative)
 * @param {Numeric | number} remove
 *  The number of items to remove
 * @param {List<T> | null | undefined} [items]
 *  The items to inject into `list`
 * @return {T[]}
 *  Removed items
 */
function splice<T>(
  this: void,
  list: T[],
  start: Numeric | number,
  remove: Numeric | number,
  items?: List<T> | null | undefined
): T[] {
  if (!Array.isArray(items)) items = [...items ?? []]
  if (typeof start !== 'number') start = +start

  /**
   * Removed items.
   *
   * @const {T[]} removed
   */
  const removed: T[] = []

  // clamp `start` in the range [0, list.length].
  if (start < 0) {
    start = -start > list.length ? 0 : list.length + start
  } else {
    start = Math.min(start, list.length)
  }

  // clamp `remove` in the range [0, Number.POSITIVE_INFINITY].
  remove = Math.max(typeof remove === 'number' ? remove : +remove, 0)

  // no need to chunk if there are less than `v8MaxSafeChunkSize` items.
  if (items.length < constants.v8MaxSafeChunkSize) {
    removed.push(...list.splice(start, remove, ...items))
  } else {
    // chunk if there are at least `v8MaxSafeChunkSize` items.

    /**
     * Chunk offset.
     *
     * @var {number} k
     */
    let k: number = 0

    // delete `remove` number of items from `start`.
    if (remove) removed.push(...list.splice(start, remove))

    // insert items in chunks to not cause stack overflows.
    while (k < items.length) {
      list.splice(start, 0, ...items.slice(k, k + constants.v8MaxSafeChunkSize))

      k += constants.v8MaxSafeChunkSize
      start += constants.v8MaxSafeChunkSize
    }
  }

  return removed
}

export default splice
