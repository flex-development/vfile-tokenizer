/**
 * @file Unit Tests - eol
 * @module fsm-tokenizer/utils/tests/unit/eol
 */

import codes from '#enums/codes'
import testSubject from '#utils/eol'

describe('unit:utils/eol', () => {
  it('should return `false` if `code` is not line ending', () => {
    expect(testSubject(codes.eof)).to.be.false
  })

  it.each<keyof typeof codes>([
    'cr',
    'crlf',
    'lf',
    'ls',
    'ps',
    'vcr',
    'vlf'
  ])('should return `true` if `code` is line ending (codes.%s)', key => {
    expect(testSubject(codes[key])).to.be.true
  })
})
