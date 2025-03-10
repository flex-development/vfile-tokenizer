/**
 * @file Interfaces - Options
 * @module vfile-tokenizer/interfaces/Options
 */

import type { u } from '@flex-development/unist-util-builder'
import type { Point } from '@flex-development/vfile-location'
import type {
  CodeCheck,
  CreateInitialConstruct,
  FinalizeContext,
  InitialConstruct,
  Preprocessor,
  TokenFactory
} from '@flex-development/vfile-tokenizer'

/**
 * Configuration options.
 */
interface Options {
  /**
   * Debug logger name.
   *
   * @default 'vfile-tokenizer'
   */
  debug?: string | null | undefined

  /**
   * Disabled construct names.
   */
  disabled?: readonly string[] | null | undefined

  /**
   * Line ending code check.
   *
   * @see {@linkcode CodeCheck}
   */
  eol?: CodeCheck | null | undefined

  /**
   * Finalize the tokenization context.
   *
   * @see {@linkcode FinalizeContext}
   */
  finalizeContext?: FinalizeContext | null | undefined

  /**
   * Point before first character.
   *
   * @see {@linkcode Point}
   *
   * @default { column: 1, line: 1, offset: 0 }
   */
  from?: Point | null | undefined

  /**
   * Initial construct.
   *
   * @see {@linkcode CreateInitialConstruct}
   * @see {@linkcode InitialConstruct}
   */
  initialize: CreateInitialConstruct | InitialConstruct

  /**
   * Turn a value into character code chunks.
   *
   * @see {@linkcode Preprocessor}
   */
  preprocess?: Preprocessor | null | undefined

  /**
   * Create a new token.
   *
   * @see {@linkcode TokenFactory}
   * @see {@linkcode u}
   *
   * @default u
   */
  token?: TokenFactory | null | undefined
}

export type { Options as default }
