/**
 * @file Type Aliases - Chunk
 * @module vfile-tokenizer/types/Chunk
 */

import type { Code } from '@flex-development/vfile-tokenizer'

/**
 * A character code or slice of a buffer in the form of an array.
 *
 * @see {@linkcode Code}
 */
type Chunk = Code | NonNullable<Code>[]

export type { Chunk as default }
