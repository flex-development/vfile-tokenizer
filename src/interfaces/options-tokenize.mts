/**
 * @file Interfaces - TokenizeOptions
 * @module vfile-tokenizer/interfaces/TokenizeOptions
 */

import type {
  Options,
  PreprocessOptions,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'

/**
 * Options for tokenizing.
 *
 * @see {@linkcode Options}
 * @see {@linkcode PreprocessOptions}
 *
 * @extends {Options}
 * @extends {PreprocessOptions}
 */
interface TokenizeOptions extends Options, PreprocessOptions {
  /**
   * The tokenizer to use.
   *
   * @see {@linkcode TokenizeContext}
   */
  tokenizer?: TokenizeContext | null | undefined
}

export type { TokenizeOptions as default }
