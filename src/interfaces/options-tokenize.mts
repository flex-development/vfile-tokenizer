/**
 * @file Interfaces - TokenizeOptions
 * @module vfile-tokenizer/interfaces/TokenizeOptions
 */

import type { Options } from '@flex-development/vfile-tokenizer'

/**
 * Options for tokenizing.
 *
 * @see {@linkcode Options}
 *
 * @extends {Options}
 */
interface TokenizeOptions extends Options {
  /**
   * Whether to write the stream break code in between chunks.
   *
   * > 👉 **Note**: Only applicable when tokenizing a list.
   */
  breaks?: boolean | null | undefined
}

export type { TokenizeOptions as default }
