/**
 * @file Type Tests - TokenizeContext
 * @module vfile-tokenizer/interfaces/tests/unit-d/TokenizeContext
 */

import type TestSubject from '#interfaces/tokenize-context'
import type { Optional } from '@flex-development/tutils'
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
  it('should match [code: Code]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('code').toEqualTypeOf<Code>()
  })

  it('should match [currentConstruct?: Construct | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('currentConstruct')
      .toEqualTypeOf<Optional<Construct>>()
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

  it('should match [interrupt?: boolean | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('interrupt')
      .toEqualTypeOf<Optional<boolean>>()
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
