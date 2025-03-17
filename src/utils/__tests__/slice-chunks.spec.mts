/**
 * @file Unit Tests - sliceChunks
 * @module vfile-tokenizer/utils/tests/unit/sliceChunks
 */

import codes from '#enums/codes'
import preprocess from '#preprocess'
import testSubject from '#utils/slice-chunks'
import type { Position } from '@flex-development/vfile-tokenizer'

describe('unit:utils/sliceChunks', () => {
  it.each<Parameters<typeof testSubject>>([
    [
      ['--conditions', codes.break, codes.eof],
      {
        end: { _bufferIndex: 12, _index: 0, column: 13, line: 1, offset: 12 },
        start: { _bufferIndex: 0, _index: 0, column: 1, line: 1, offset: 0 }
      }
    ],
    [
      ['--conditions=', 'vfile-tokenizer', codes.eof],
      {
        end: { _bufferIndex: -1, _index: 1, column: 29, line: 1, offset: 28 },
        start: { _bufferIndex: 0, _index: 0, column: 1, line: 1, offset: 0 }
      }
    ],
    [
      [preprocess()('--conditions'), codes.break, codes.eof],
      {
        end: { _bufferIndex: 12, _index: 0, column: 13, line: 1, offset: 12 },
        start: { _bufferIndex: 2, _index: 0, column: 3, line: 1, offset: 2 }
      }
    ],
    [
      [preprocess()('--conditions=vfile-tokenizer'), codes.eof],
      {
        end: { _bufferIndex: -1, _index: 1, column: 29, line: 1, offset: 28 },
        start: { _bufferIndex: 13, _index: 0, column: 14, line: 1, offset: 13 }
      }
    ]
  ])('should return chunks spanning `range` (%#)', (chunks, range) => {
    expect(testSubject(chunks, range)).toMatchSnapshot()
  })

  it('should return empty list if `chunks` is empty', () => {
    // Arrange
    const range: Position = {
      end: { _bufferIndex: -1, _index: 1, column: 29, line: 1, offset: 28 },
      start: { _bufferIndex: 13, _index: 0, column: 14, line: 1, offset: 13 }
    }

    // Act + Expect
    expect(testSubject([], range)).to.eql([])
  })

  it('should return empty list without `range`', () => {
    expect(testSubject([codes.eof], null)).to.eql([])
  })
})
