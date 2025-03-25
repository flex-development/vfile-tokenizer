/**
 * @file Type Aliases - Chunk
 * @module fsm-tokenizer/types/Chunk
 */

import type { Code } from '@flex-development/fsm-tokenizer'

/**
 * A character code or slice of a buffer in the form of an array.
 *
 * @see {@linkcode Code}
 */
type Chunk = Code | NonNullable<Code>[]

export type { Chunk as default }
