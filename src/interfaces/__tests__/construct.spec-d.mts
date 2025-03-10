/**
 * @file Type Tests - Construct
 * @module vfile-tokenizer/interfaces/tests/unit-d/Construct
 */

import type TestSubject from '#interfaces/construct'
import type { Optional } from '@flex-development/tutils'
import type {
  Guard,
  Resolver,
  Tokenizer
} from '@flex-development/vfile-tokenizer'

describe('unit-d:interfaces/Construct', () => {
  it('should match [name?: string | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('name')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [partial?: boolean | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('partial')
      .toEqualTypeOf<Optional<boolean>>()
  })

  it('should match [previous?: Guard | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('previous')
      .toEqualTypeOf<Optional<Guard>>()
  })

  it('should match [resolve?: Resolver | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('resolve')
      .toEqualTypeOf<Optional<Resolver>>()
  })

  it('should match [resolveAll?: Resolver | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('resolveAll')
      .toEqualTypeOf<Optional<Resolver>>()
  })

  it('should match [resolveTo?: Resolver | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('resolveTo')
      .toEqualTypeOf<Optional<Resolver>>()
  })

  it('should match [test?: Guard | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('test')
      .toEqualTypeOf<Optional<Guard>>()
  })

  it('should match [tokenize: Tokenizer]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tokenize')
      .toEqualTypeOf<Tokenizer>()
  })
})
