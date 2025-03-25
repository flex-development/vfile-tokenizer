/**
 * @file Type Aliases - Range
 * @module fsm-tokenizer/types/Range
 */

import type { RangeInfo } from '@flex-development/fsm-tokenizer'

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
