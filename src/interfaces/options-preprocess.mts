/**
 * @file Interfaces - PreprocessOptions
 * @module vfile-tokenizer/interfaces/PreprocessOptions
 */

/**
 * Preprocessor configuration options.
 */
interface PreprocessOptions {
  /**
   * Number of spaces a tab is equivalent to.
   *
   * @default constants.tabSize
   */
  tabSize?: number | null | undefined
}

export type { PreprocessOptions as default }
