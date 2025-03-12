/**
 * @file Unit Tests - preprocess
 * @module vfile-tokenizer/tests/unit/preprocess
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
import testSubject from '#preprocess'
import type {
  FileLike,
  Preprocess,
  Value
} from '@flex-development/vfile-tokenizer'

describe('unit:preprocess', () => {
  let subject: Preprocess

  beforeAll(() => {
    subject = testSubject()
  })

  it('should return character code preprocessor', () => {
    expect(subject).to.be.a('function').with.property('name', 'preprocess')
  })

  describe('preprocess', () => {
    it.each<[FileLike | Value | null | undefined]>([
      [chars.break],
      [chars.ht],
      [chars.lf + chars.cr + chars.crlf],
      [{ value: 'hello' + chars.ht + 'world' }],
      [{ value: Buffer.from('--debug=true --pizza-type meat --small') }]
    ])('should return character code chunk list (%#)', value => {
      // Act
      const result = subject(value, null, true)
      const length = result.length

      // Expect
      expect(result).to.be.an('array').with.property('length').be.gte(1)
      expect(result).to.have.property(String(length - 1)).to.eq(codes.eof)
      expect(result).toMatchSnapshot()
    })
  })
})
