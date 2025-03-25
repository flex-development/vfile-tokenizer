/**
 * @file Utilities - push
 * @module fsm-tokenizer/utils/push
 */

import splice from '#utils/splice'

/**
 * Append items to the end of `list`.
 *
 * > 👉 **Note**: Adds items in batches to prevent V8 from hanging and returns
 * > `items` when `list` is empty to prevent a potentially expensive operation.
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
 * @param {T[]} items
 *  The items to inject into `list`
 * @return {T[]}
 *  `items` when `list` is empty, `list` otherwise
 */
function push<T>(this: void, list: T[], items: T[]): T[] {
  if (!list.length) return items
  return splice(list, list.length, 0, items), list
}

export default push
