/**
 * @file Unit Tests - noop
 * @module fsm-tokenizer/internal/tests/unit/noop
 */

import testSubject from '#internal/noop'

describe('unit:internal/noop', () => {
  it('should return `undefined`', () => {
    expect(testSubject()).to.be.undefined
  })
})
