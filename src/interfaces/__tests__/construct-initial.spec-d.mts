/**
 * @file Type Tests - InitialConstruct
 * @module vfile-tokenizer/interfaces/tests/unit-d/InitialConstruct
 */

import type TestSubject from '#interfaces/construct-initial'
import type { Construct, Initializer } from '@flex-development/vfile-tokenizer'

describe('unit-d:interfaces/InitialConstruct', () => {
  it('should extend Construct', () => {
    expectTypeOf<TestSubject>().toExtend<Construct>()
  })

  it('should match [tokenize: Initializer]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tokenize')
      .toEqualTypeOf<Initializer>()
  })
})
