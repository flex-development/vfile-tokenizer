/**
 * @file Type Tests - Options
 * @module vfile-tokenizer/interfaces/tests/unit-d/Options
 */

import type TestSubject from '#interfaces/options'
import type { Nilable } from '@flex-development/tutils'
import type { Point } from '@flex-development/vfile-location'
import type {
  CodeCheck,
  CreateInitialConstruct,
  Encoding,
  FinalizeContext,
  InitialConstruct,
  List,
  Preprocess,
  PreprocessOptions,
  TokenFactory
} from '@flex-development/vfile-tokenizer'

describe('unit-d:interfaces/Options', () => {
  it('should extend PreprocessOptions', () => {
    expectTypeOf<TestSubject>().toExtend<PreprocessOptions>()
  })

  it('should match [debug?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('debug')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [disabled?: List<string> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('disabled')
      .toEqualTypeOf<Nilable<List<string>>>()
  })

  it('should match [eol?: CodeCheck | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('eol')
      .toEqualTypeOf<Nilable<CodeCheck>>()
  })

  it('should match [encoding?: Encoding | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('encoding')
      .toEqualTypeOf<Nilable<Encoding>>()
  })

  it('should match [finalizeContext?: FinalizeContext | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('finalizeContext')
      .toEqualTypeOf<Nilable<FinalizeContext>>()
  })

  it('should match [from?: Point | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('from')
      .toEqualTypeOf<Nilable<Point>>()
  })

  it('should match [initial: CreateInitialConstruct | InitialConstruct]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('initial')
      .toEqualTypeOf<CreateInitialConstruct | InitialConstruct>()
  })

  it('should match [moveOnBreak?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('moveOnBreak')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [preprocess?: Preprocess | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('preprocess')
      .toEqualTypeOf<Nilable<Preprocess>>()
  })

  it('should match [token?: TokenFactory | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('token')
      .toEqualTypeOf<Nilable<TokenFactory>>()
  })
})
