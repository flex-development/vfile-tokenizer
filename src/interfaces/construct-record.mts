/**
 * @file Type Aliases - ConstructRecord
 * @module fsm-tokenizer/interfaces/ConstructRecord
 */

import type { ConstructPack, Numeric } from '@flex-development/fsm-tokenizer'

/**
 * Several constructs, mapped from their initial codes.
 */
interface ConstructRecord {
  /**
   * Try tokenizing constructs that start with the specified character code.
   *
   * @see {@linkcode ConstructPack}
   * @see {@linkcode Numeric}
   */
  [code: Numeric | number]: ConstructPack | null | undefined

  /**
   * Try tokenizing constructs that start with any character code.
   *
   * @see {@linkcode ConstructPack}
   */
  null?: ConstructPack | null | undefined
}

export type { ConstructRecord as default }
