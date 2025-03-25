/**
 * @file Type Tests - TokenizeContext
 * @module fsm-tokenizer/interfaces/tests/unit-d/TokenizeContext
 */

import type TestSubject from '#interfaces/tokenize-context'
import type {
  Code,
  Construct,
  DefineSkip,
  Encoding,
  Event,
  Now,
  Preprocess,
  SliceSerialize,
  SliceStream,
  TokenFactory,
  Write
} from '@flex-development/fsm-tokenizer'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/TokenizeContext', () => {
  it('should match [breaks?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('breaks')
      .toEqualTypeOf<Nilable<boolean>>()
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

  it('should match [encoding?: Encoding | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('encoding')
      .toEqualTypeOf<Nilable<Encoding>>()
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

  it('should match [now: Now]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('now').toEqualTypeOf<Now>()
  })

  it('should match [preprocess: Preprocess]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('preprocess')
      .toEqualTypeOf<Preprocess>()
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
