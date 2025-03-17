/**
 * @file Type Aliases - SliceStream
 * @module vfile-tokenizer/types/SliceStream
 */

import type { Chunk, Position } from '@flex-development/vfile-tokenizer'

/**
 * Get the chunks spanning `range`.
 *
 * @see {@linkcode Chunk}
 * @see {@linkcode Position}
 *
 * @this {void}
 *
 * @param {Position} range
 *  Position in stream
 * @return {Chunk[]}
 *  Chunks in stream spanning `range`
 */
type SliceStream = (this: void, range: Position) => Chunk[]

export type { SliceStream as default }
