/**
 * @file Interfaces - Construct
 * @module vfile-tokenizer/interfaces/Construct
 */

import type {
  Guard,
  Resolver,
  Tokenizer
} from '@flex-development/vfile-tokenizer'

/**
 * Object describing how to tokenize a region of a source file.
 */
interface Construct {
  /**
   * Name of the construct, used to toggle constructs off.
   */
  name?: string | undefined

  /**
   * Whether this construct represents a partial construct.
   */
  partial?: boolean | undefined

  /**
   * Check if the previous character code can come before this construct.
   *
   * @see {@linkcode Guard}
   */
  previous?: Guard | undefined

  /**
   * Resolve the events parsed by {@linkcode tokenize}.
   *
   * @see {@linkcode Resolver}
   */
  resolve?: Resolver | undefined

  /**
   * Resolve all events when the content is complete, from the start to the end.
   *
   * > 👉 **Note**: Only used if {@linkcode tokenize} is successful once in the
   * > content.
   *
   * @see {@linkcode Resolver}
   */
  resolveAll?: Resolver | undefined

  /**
   * Resolve the events from the start of the content (which may include other
   * constructs) to the last one parsed by {@linkcode tokenize}.
   *
   * @see {@linkcode Resolver}
   */
  resolveTo?: Resolver | undefined

  /**
   * Check if the current character code can start this construct.
   *
   * @see {@linkcode Guard}
   */
  test?: Guard | undefined

  /**
   * Set up a state machine to handle character codes streaming in.
   *
   * @see {@linkcode Tokenizer}
   */
  tokenize: Tokenizer
}

export type { Construct as default }
