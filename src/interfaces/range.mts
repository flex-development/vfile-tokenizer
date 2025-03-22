/**
 * @file Type Aliases - Range
 * @module vfile-tokenizer/types/Range
 */

import type { RangeInfo } from '@flex-development/vfile-tokenizer'

/**
 * A range of chunks in a stream.
 */
interface Range {
  /**
   * Position of last chunk in range.
   *
   * @see {@linkcode RangeInfo}
   */
  end: RangeInfo

  /**
   * Position of first chunk in range.
   *
   * @see {@linkcode Position}
   */
  start: RangeInfo
}

export type { Range as default }
