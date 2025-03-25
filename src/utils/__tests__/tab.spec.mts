/**
 * @file Unit Tests - tab
 * @module fsm-tokenizer/utils/tests/unit/tab
 */

import codes from '#enums/codes'
import testSubject from '#utils/tab'

describe('unit:utils/tab', () => {
  it('should return `false` if `code` is not horizontal tab', () => {
    expect(testSubject(codes.eof)).to.be.false
  })

  it.each<keyof typeof codes>([
    'ht',
    'vht'
  ])('should return `true` if `code` is horizontal tab (codes.%s)', key => {
    expect(testSubject(codes[key])).to.be.true
  })
})
