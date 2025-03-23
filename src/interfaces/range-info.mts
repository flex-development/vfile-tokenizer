/**
 * @file Interfaces - RangeInfo
 * @module vfile-tokenizer/interfaces/RangeInfo
 */

/**
 * Stream position metadata.
 */
interface RangeInfo {
  /**
   * Position in a string chunk (or `-1` when pointing to a numeric chunk).
   */
  _bufferIndex: number

  /**
   * Position in a list of chunks.
   */
  _index: number
}

export type { RangeInfo as default }
