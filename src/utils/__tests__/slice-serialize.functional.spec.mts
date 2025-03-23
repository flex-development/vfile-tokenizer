/**
 * @file Functional Tests - sliceSerialize
 * @module vfile-tokenizer/utils/tests/functional/sliceSerialize
 */

import codes from '#enums/codes'
import serializeChunks from '#utils/serialize-chunks'
import sliceChunks from '#utils/slice-chunks'
import testSubject from '#utils/slice-serialize'
import type { Chunk, List, Range } from '@flex-development/vfile-tokenizer'
import type { MockContext } from 'vitest'

vi.mock('#utils/serialize-chunks')
vi.mock('#utils/slice-chunks')

describe('functional:utils/sliceSerialize', () => {
  type T = Chunk | string

  let chunks: List<T>
  let expandTabs: boolean | null | undefined
  let range: Range

  beforeAll(() => {
    expandTabs = false

    chunks = [
      codes.digit0,
      codes.digit1,
      codes.digit2,
      codes.digit3,
      codes.digit4,
      codes.digit5,
      codes.digit6,
      codes.digit7,
      codes.digit8,
      codes.digit9,
      codes.eof
    ]

    range = {
      end: { _bufferIndex: -1, _index: chunks.length - 1 },
      start: { _bufferIndex: -1, _index: 0 }
    }
  })

  beforeEach(() => {
    testSubject(chunks, range, expandTabs)
  })

  it('should serialize sliced `chunks`', () => {
    // Arrange
    const slicer: MockContext<typeof sliceChunks> = vi.mocked(sliceChunks).mock
    const [result] = slicer.results

    // Expect
    expect(serializeChunks).toHaveBeenCalledOnce()
    expect(serializeChunks).toHaveBeenCalledWith(result!.value, expandTabs)
  })

  it('should slice `chunks`', () => {
    expect(sliceChunks).toHaveBeenCalledExactlyOnceWith(chunks, range)
  })
})
