/**
 * @file Type Aliases - TokenizeOptions
 * @module vfile-tokenizer/types/TokenizeOptions
 */

import type {
  Encoding,
  Options,
  PreprocessOptions
} from '@flex-development/vfile-tokenizer'

/**
 * Tokenize options.
 *
 * @see {@linkcode Options}
 * @see {@linkcode PreprocessOptions}
 */
type TokenizeOptions = Options & PreprocessOptions & {
  /**
   * The character encoding to use when a value is a {@linkcode Uint8Array}.
   *
   * @see {@linkcode Encoding}
   */
  encoding?: Encoding | null | undefined
}

export type { TokenizeOptions as default }
