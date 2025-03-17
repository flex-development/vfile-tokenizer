/**
 * @file Unit Tests - isCode
 * @module vfile-tokenizer/utils/tests/unit/isCode
 */

import codes from '#enums/codes'
import testSubject from '#utils/is-code'

describe('unit:utils/isCode', () => {
  it('should return `false` if `value` is not `codes.eof` or a number', () => {
    expect(testSubject([codes.digit1, codes.digit3])).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [Number.NaN],
    [codes.break],
    [codes.eof]
  ])('should return `true` if `value` is `codes.eof` or a number (%#)', val => {
    expect(testSubject(val)).to.be.true
  })
})
