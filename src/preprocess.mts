/**
 * @file preprocess
 * @module vfile-tokenizer/preprocess
 */

import codes from '#enums/codes'
import constants from '#enums/constants'
import type {
  Code,
  Column,
  Encoding,
  FileLike,
  Preprocess,
  PreprocessOptions,
  Value
} from '@flex-development/vfile-tokenizer'

/**
 * Create a preprocessor to turn a value into character code chunks.
 *
 * @see {@linkcode Preprocess}
 * @see {@linkcode PreprocessOptions}
 *
 * @this {void}
 *
 * @param {PreprocessOptions | null | undefined} [options]
 *  Configuration options
 * @return {Preprocess}
 *  Character code preprocessor
 */
function preprocess(
  this: void,
  options?: PreprocessOptions | null | undefined
): Preprocess {
  return Object.defineProperties(preprocessor.bind(options ?? {}), {
    name: { value: 'preprocess' }
  })

  /**
   * Turn `value` into character code chunks.
   *
   * @this {PreprocessOptions}
   *
   * @param {FileLike | Value | null | undefined} value
   *  The value to preprocess
   * @param {Encoding | null | undefined} [encoding]
   *  The character encoding to use when `value`
   *  or its contents is {@linkcode Uint8Array}
   * @param {boolean | null | undefined} [end]
   *  Whether the end of stream has been reached
   * @return {Code[]}
   *  Character code chunks
   */
  function preprocessor(
    this: PreprocessOptions,
    value: FileLike | Value | null | undefined,
    encoding?: Encoding | null | undefined,
    end?: boolean | null | undefined
  ): Code[] {
    /**
     * Character code chunks.
     *
     * @const {Code[]} chunks
     */
    const chunks: Code[] = []

    /**
     * Number of spaces a tab is equivalent to.
     *
     * @const {number} tabSize
     */
    const tabSize: number = this.tabSize ?? constants.tabSize

    if (value === null) {
      chunks.push(codes.break)
    } else if (value !== undefined) {
      if (typeof value === 'object' && 'value' in value) {
        value = value.value
      }

      if (typeof value !== 'string') {
        value = new TextDecoder(encoding ?? undefined).decode(value)
      }

      /**
       * Current column.
       *
       * @var {Column} column
       */
      let column: Column = 1

      /**
       * Index of current character code.
       *
       * @var {number} index
       */
      let index: number = 0

      while (index < value.length) {
        /**
         * Character code.
         *
         * @var {NonNullable<Code>} code
         */
        let code: NonNullable<Code> = value[index]!.codePointAt(0)!

        /**
         * Difference between next column and current column.
         *
         * @var {number} k
         */
        let k: number = 1

        switch (true) {
          case code === codes.cr:
            if (value[index + 1]?.codePointAt(0) === codes.lf) {
              chunks.push(codes.crlf)
              k++
            } else {
              chunks.push(codes.vcr)
            }

            column = 1
            break
          case code === codes.ht:
            /**
             * Next column.
             *
             * @const {number} n
             */
            const n: number = Math.ceil(column / tabSize) * tabSize

            chunks.push(codes.vht)
            while (column++ < n) chunks.push(codes.vs)

            break
          case code === codes.lf:
            chunks.push(codes.vlf)
            column = 1
            break
          default:
            chunks.push(code)
            column++
            break
        }

        index += k
      }
    }

    return end && chunks.push(codes.eof), chunks
  }
}

export default preprocess
