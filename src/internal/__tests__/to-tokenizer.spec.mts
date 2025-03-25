/**
 * @file Unit Tests - toTokenizer
 * @module fsm-tokenizer/internal/tests/unit/toTokenizer
 */

import initialize from '#constructs/initialize'
import testSubject from '#internal/to-tokenizer'
import type {
  TokenizeContext,
  TokenizeOptions
} from '@flex-development/fsm-tokenizer'
import type { Mock } from 'vitest'

describe('unit:internal/toTokenizer', () => {
  it('should return `value` if `value` is a tokenizer', () => {
    // Arrange
    const write: Mock<TokenizeContext['write']> = vi.fn().mockName('write')
    const value: TokenizeContext = { write } as unknown as TokenizeContext

    // Act + Expect
    expect(testSubject(value)).to.eq(value)
  })

  it('should return new tokenizer if `value` is not a tokenizer', () => {
    // Arrange
    const value: TokenizeOptions = { initial: initialize([]) }

    // Act
    const result = testSubject(value)

    // Expect
    expect(result).to.not.eq(value)
    expect(result).to.have.property('write').be.a('function')
  })
})
