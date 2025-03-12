/**
 * @file Type Aliases - SliceStream
 * @module vfile-tokenizer/types/SliceStream
 */

import type { Code, Position } from '@flex-development/vfile-tokenizer'

/**
 * Get the chunks spanning `range`.
 *
 * @see {@linkcode Code}
 * @see {@linkcode Position}
 *
 * @this {void}
 *
 * @param {Position} range
 *  Position in stream
 * @return {Code[]}
 *  List of chunks in stream spanning `range`
 */
type SliceStream = (this: void, range: Position) => Code[]

export type { SliceStream as default }
