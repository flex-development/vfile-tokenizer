/**
 * @file Unit Tests - disabled
 * @module vfile-tokenizer/internal/tests/unit/disabled
 */

import testSubject from '#internal/disabled'

describe('unit:internal/disabled', () => {
  it.each<Parameters<typeof testSubject>>([
    [['codeText'], 'codeIndented'],
    [[], undefined],
    [null, 'codeIndented'],
    [undefined, null]
  ])('should return `false` if construct is not disabled (%#)', (
    list,
    construct
  ) => {
    expect(testSubject(list, construct)).to.be.false
  })

  it('should return `true` if construct is disabled', () => {
    // Arrange
    const construct: string = 'eof'

    // Act + Expect
    expect(testSubject([construct], construct)).to.be.true
  })
})
