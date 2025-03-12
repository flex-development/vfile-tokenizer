/**
 * @file Type Aliases - List
 * @module vfile-tokenizer/types/List
 */

/**
 * A list.
 *
 * @template {any} [T=unknown]
 *  List item type
 */
type List<T = unknown> = Set<T> | readonly T[]

export type { List as default }
