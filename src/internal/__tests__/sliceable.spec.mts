/**
 * @file Unit Tests - sliceable
 * @module vfile-tokenizer/internal/tests/unit/sliceable
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
import testSubject from '#internal/sliceable'

describe('unit:internal/sliceable', () => {
  it('should return `false` if `value` is not an array or string', () => {
    expect(testSubject(codes.eof)).to.be.false
  })

  it('should return `true` if `value` is an array', () => {
    expect(testSubject([])).to.be.true
  })

  it('should return `true` if `value` is a string', () => {
    expect(testSubject(chars.empty)).to.be.true
  })
})
