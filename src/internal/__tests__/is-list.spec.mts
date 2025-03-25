/**
 * @file Unit Tests - isList
 * @module fsm-tokenizer/internal/tests/unit/isList
 */

import codes from '#enums/codes'
import testSubject from '#internal/is-list'

describe('unit:internal/isList', () => {
  it.each<Parameters<typeof testSubject>>([
    [codes.break],
    [new Map()],
    [new WeakSet()]
  ])('should return `false` if `value` is not a list (%#)', value => {
    expect(testSubject(value)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [[codes.eof]],
    [new Set(['0', '1', 'false', 'true'])]
  ])('should return `true` if `value` is a list (%#)', value => {
    expect(testSubject(value)).to.be.true
  })
})
