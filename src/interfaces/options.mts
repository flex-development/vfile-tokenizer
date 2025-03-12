/**
 * @file Interfaces - Options
 * @module vfile-tokenizer/interfaces/Options
 */

import type { u } from '@flex-development/unist-util-builder'
import type { Point } from '@flex-development/vfile-location'
import type {
  CodeCheck,
  CreateInitialConstruct,
  Encoding,
  FinalizeContext,
  InitialConstruct,
  List,
  Preprocess,
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
   * List of disabled construct names.
   *
   * @see {@linkcode List}
   */
  disabled?: List<string> | null | undefined

  /**
   * Line ending code check.
   *
   * @see {@linkcode CodeCheck}
   */
  eol?: CodeCheck | null | undefined

  /**
   * The character encoding to use when converting a {@linkcode Uint8Array} to
   * character code chunks.
   *
   * @see {@linkcode Encoding}
   */
  encoding?: Encoding | null | undefined

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
  initial: CreateInitialConstruct | InitialConstruct

  /**
   * Turn a value into character code chunks.
   *
   * @see {@linkcode Preprocess}
   */
  preprocess?: Preprocess | null | undefined

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
