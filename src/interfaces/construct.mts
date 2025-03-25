/**
 * @file Interfaces - Construct
 * @module fsm-tokenizer/interfaces/Construct
 */

import type {
  Guard,
  Resolver,
  Tokenizer
} from '@flex-development/fsm-tokenizer'

/**
 * Object describing how to tokenize a region of a source value.
 */
interface Construct {
  /**
   * Name of the construct, used to toggle constructs off.
   */
  name?: string | null | undefined

  /**
   * Whether this construct represents a partial construct.
   */
  partial?: boolean | null | undefined

  /**
   * Check if the previous character code can come before this construct.
   *
   * @see {@linkcode Guard}
   */
  previous?: Guard | null | undefined

  /**
   * Resolve the events parsed by {@linkcode tokenize}.
   *
   * @see {@linkcode Resolver}
   */
  resolve?: Resolver | null | undefined

  /**
   * Resolve all events when the content is complete, from the start to the end.
   *
   * > 👉 **Note**: Only used if {@linkcode tokenize} is successful at least
   * > once in the content.
   *
   * @see {@linkcode Resolver}
   */
  resolveAll?: Resolver | null | undefined

  /**
   * Resolve the events parsed from the start of the content (which may include
   * other constructs) to the last one parsed by {@linkcode tokenize}.
   *
   * @see {@linkcode Resolver}
   */
  resolveTo?: Resolver | null | undefined

  /**
   * Check if the current character code can start this construct.
   *
   * @see {@linkcode Guard}
   */
  test?: Guard | null | undefined

  /**
   * Set up a state machine to handle character codes streaming in.
   *
   * @see {@linkcode Tokenizer}
   */
  tokenize: Tokenizer
}

export type { Construct as default }
