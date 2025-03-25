/**
 * @file Type Tests - EventType
 * @module fsm-tokenizer/types/tests/unit-d/EventType
 */

import type TestSubject from '#types/event-type'
import type { ev } from '@flex-development/fsm-tokenizer'

describe('unit-d:types/EventType', () => {
  it('should extract keyof typeof ev', () => {
    expectTypeOf<TestSubject>().extract<keyof typeof ev>().not.toBeNever()
  })
})
