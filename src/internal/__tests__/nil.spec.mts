/**
 * @file Unit Tests - nil
 * @module fsm-tokenizer/internal/tests/unit/nil
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
import testSubject from '#internal/nil'

describe('unit:internal/nil', () => {
  it('should return `false` if `value` is not `null` or `undefined`', () => {
    expect(testSubject(chars.empty)).to.be.false
  })

  it('should return `true` if `value` is `null`', () => {
    expect(testSubject(codes.eof)).to.be.true
  })

  it('should return `true` if `value` is `undefined`', () => {
    expect(testSubject(undefined)).to.be.true
  })
})
