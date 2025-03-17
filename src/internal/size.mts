/**
 * @file Internal - size
 * @module vfile-tokenizer/internal/size
 */

import type { List } from '@flex-development/vfile-tokenizer'

/**
 * Get the size of a `list`.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {List} list
 *  The list to measure
 * @return {number}
 *  Size of `list`
 */
function size(this: void, list: List): number {
  return Array.isArray(list) ? list.length : list.size
}

export default size
