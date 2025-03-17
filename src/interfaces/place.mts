/**
 * @file Interfaces - Place
 * @module vfile-tokenizer/interfaces/Place
 */

import type { Point } from '@flex-development/vfile-location'

/**
 * One place in a file, with additional chunk metadata.
 *
 * @see {@linkcode Point}
 *
 * @extends {Point}
 */
interface Place extends Point {
  /**
   * Position in a string chunk (or `-1` when pointing to a numeric chunk).
   */
  _bufferIndex: number

  /**
   * Position in a list of chunks.
   */
  _index: number
}

export type { Place as default }
