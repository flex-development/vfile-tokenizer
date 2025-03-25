/**
 * @file Unit Tests - eof
 * @module fsm-tokenizer/utils/tests/unit/eof
 */

import codes from '#enums/codes'
import testSubject from '#utils/eof'

describe('unit:utils/eof', () => {
  it('should return `false` if `code` is not `codes.eof`', () => {
    expect(testSubject(codes.break)).to.be.false
  })

  it('should return `true` if `code` is `codes.eof`', () => {
    expect(testSubject(codes.eof)).to.be.true
  })
})
