/**
 * @file Type Tests - TokenizeContext
 * @module vfile-tokenizer/interfaces/tests/unit-d/TokenizeContext
 */

import type TestSubject from '#interfaces/tokenize-context'
import type { Nilable } from '@flex-development/tutils'
import type {
  Code,
  Construct,
  DefineSkip,
  Event,
  Now,
  SliceSerialize,
  SliceStream,
  TokenFactory,
  Write
} from '@flex-development/vfile-tokenizer'

describe('unit-d:interfaces/TokenizeContext', () => {
  it('should match [chunk?: number | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('chunk')
      .toEqualTypeOf<Nilable<number>>()
  })

  it('should match [code: Code]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('code').toEqualTypeOf<Code>()
  })

  it('should match [currentConstruct?: Construct | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('currentConstruct')
      .toEqualTypeOf<Nilable<Construct>>()
  })

  it('should match [defineSkip: DefineSkip]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('defineSkip')
      .toEqualTypeOf<DefineSkip>()
  })

  it('should match [events: Event[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('events')
      .toEqualTypeOf<Event[]>()
  })

  it('should match [interrupt?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('interrupt')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [next: Code]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('next').toEqualTypeOf<Code>()
  })

  it('should match [now: Now]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('now').toEqualTypeOf<Now>()
  })

  it('should match [previous: Code]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('previous').toEqualTypeOf<Code>()
  })

  it('should match [sliceSerialize: SliceSerialize]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('sliceSerialize')
      .toEqualTypeOf<SliceSerialize>()
  })

  it('should match [sliceStream: SliceStream]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('sliceStream')
      .toEqualTypeOf<SliceStream>()
  })

  it('should match [token: TokenFactory]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('token')
      .toEqualTypeOf<TokenFactory>()
  })

  it('should match [write: Write]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('write').toEqualTypeOf<Write>()
  })
})
