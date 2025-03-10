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
  FinalizeContext,
  InitialConstruct,
  Preprocessor,
  TokenFactory
} from '@flex-development/vfile-tokenizer'

describe('unit-d:interfaces/Options', () => {
  it('should match [debug?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('debug')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [disabled?: readonly string[] | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('disabled')
      .toEqualTypeOf<Nilable<readonly string[]>>()
  })

  it('should match [eol?: CodeCheck | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('eol')
      .toEqualTypeOf<Nilable<CodeCheck>>()
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

  it('should match [initialize: CreateInitialConstruct | InitialConstruct]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('initialize')
      .toEqualTypeOf<CreateInitialConstruct | InitialConstruct>()
  })

  it('should match [preprocess?: Preprocessor | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('preprocess')
      .toEqualTypeOf<Nilable<Preprocessor>>()
  })

  it('should match [token?: TokenFactory | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('token')
      .toEqualTypeOf<Nilable<TokenFactory>>()
  })
})
