/**
 * @file Unit Tests - serializeChunks
 * @module vfile-tokenizer/utils/tests/unit/serializeChunks
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
import testSubject from '#utils/serialize-chunks'

describe('unit:utils/serializeChunks', () => {
  it.each<Parameters<typeof testSubject>>([
    [[codes.vlf, codes.vcr, codes.crlf]],
    [[codes.vht, codes.vs, chars.digit1]],
    [[codes.vht, codes.vs, codes.digit2], true]
  ])('should return string value of `chunks` (%#)', (chunks, expandTabs) => {
    expect(testSubject(chunks, expandTabs)).toMatchSnapshot()
  })
})
