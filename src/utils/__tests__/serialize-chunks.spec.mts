/**
 * @file Unit Tests - serializeChunks
 * @module fsm-tokenizer/utils/tests/unit/serializeChunks
 */

import chars from '#enums/chars'
import codes from '#enums/codes'
import testSubject from '#utils/serialize-chunks'

describe('unit:utils/serializeChunks', () => {
  it.each<Parameters<typeof testSubject>>([
    [[codes.vlf, codes.vcr, codes.crlf]],
    [
      [[codes.vht, codes.vs], codes.break, [codes.digit1]],
      {
        breaks: chars.empty
      }
    ],
    [[codes.vht, codes.vs, codes.digit2], true],
    [[[codes.empty], codes.break, [codes.digit3]], { breaks: chars.space }],
    [['hello', codes.break, 'world'], { breaks: true }]
  ])('should return string value of `chunks` (%#)', (chunks, options) => {
    expect(testSubject(chunks, options)).toMatchSnapshot()
  })
})
