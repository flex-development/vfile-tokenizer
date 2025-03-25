/**
 * @file Type Tests - Preprocess
 * @module fsm-tokenizer/interfaces/tests/unit-d/Preprocess
 */

import type TestSubject from '#interfaces/preprocess'
import type {
  Code,
  Encoding,
  FileLike,
  Value
} from '@flex-development/fsm-tokenizer'

describe('unit-d:interfaces/Preprocess', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [FileLike | Value | null | undefined, Encoding | null | undefined, false | null | undefined]', () => {
      // Arrange
      type P = [
        value: FileLike | Value | null | undefined,
        encoding: Encoding | null | undefined,
        end: false | null | undefined
      ]

      // Expect
      expectTypeOf<TestSubject>().parameters.extract<P>().not.toBeNever()
    })

    it('should be callable with [FileLike | Value | null | undefined, Encoding | null | undefined, true]', () => {
      // Arrange
      type P = [
        value: FileLike | Value | null | undefined,
        encoding: Encoding | null | undefined,
        end: true
      ]

      // Expect
      expectTypeOf<TestSubject>().parameters.extract<P>().not.toBeNever()
    })

    it('should be callable with [FileLike | Value | null | undefined, (Encoding | null | undefined)?, (boolean | null | undefined)?]', () => {
      // Arrange
      type P = [
        value: FileLike | Value | null | undefined,
        encoding?: Encoding | null | undefined,
        end?: boolean | null | undefined
      ]

      // Expect
      expectTypeOf<TestSubject>().parameters.extract<P>().not.toBeNever()
    })

    it('should be callable with [FileLike | Value | null | undefined, (Encoding | null | undefined)?, (false | null | undefined)?]', () => {
      // Arrange
      type P = [
        value: FileLike | Value | null | undefined,
        encoding?: Encoding | null | undefined,
        end?: false | null | undefined
      ]

      // Expect
      expectTypeOf<TestSubject>().parameters.extract<P>().not.toBeNever()
    })
  })

  describe('returns', () => {
    it('should return Code[] | NonNullable<Code>[]', () => {
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<Code[] | NonNullable<Code>[]>()
    })
  })
})
