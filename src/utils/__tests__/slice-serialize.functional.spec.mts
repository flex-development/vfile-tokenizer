/**
 * @file Functional Tests - sliceSerialize
 * @module vfile-tokenizer/utils/tests/functional/sliceSerialize
 */

import serializeChunks from '#utils/serialize-chunks'
import sliceChunks from '#utils/slice-chunks'
import testSubject from '#utils/slice-serialize'
import type { Chunk, List, Position } from '@flex-development/vfile-tokenizer'
import type { MockContext } from 'vitest'

vi.mock('#utils/serialize-chunks')
vi.mock('#utils/slice-chunks')

describe('functional:utils/sliceSerialize', () => {
  type T = Chunk | string

  let chunks: List<T>
  let expandTabs: boolean | null | undefined
  let range: Position | null | undefined

  beforeAll(() => {
    chunks = []
    expandTabs = false
    range = null
  })

  beforeEach(() => {
    testSubject(chunks, range, expandTabs)
  })

  it('should serialize sliced `chunks`', () => {
    // Arrange
    const slicer: MockContext<typeof sliceChunks> = vi.mocked(sliceChunks).mock
    const slice: T[] = slicer.results.map(res => res.value as Chunk | string)

    // Expect
    expect(serializeChunks).toHaveBeenCalledOnce()
    expect(serializeChunks).toHaveBeenCalledWith(...slice, expandTabs)
  })

  it('should slice `chunks`', () => {
    expect(sliceChunks).toHaveBeenCalledExactlyOnceWith(chunks, range)
  })
})
