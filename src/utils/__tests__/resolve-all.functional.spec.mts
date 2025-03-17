/**
 * @file Functional Tests - resolveAll
 * @module vfile-tokenizer/utils/tests/functional/resolveAll
 */

import ev from '#enums/ev'
import tt from '#fixtures/tt'
import testSubject from '#utils/resolve-all'
import type {
  Construct,
  Event,
  Place,
  Resolver,
  Token,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'
import type { MockInstance } from 'vitest'

describe('functional:utils/resolveAll', () => {
  let constructs: { resolveAll: MockInstance<Resolver> }[]
  let context: TokenizeContext
  let events: Event[]
  let point: Place
  let resolveAll: MockInstance<Resolver>
  let token: Token

  beforeEach(() => {
    point = { _bufferIndex: -1, _index: 0, column: 1, line: 1, offset: 0 }
    token = { end: point, start: point, type: tt.eof }

    context = {} as unknown as TokenizeContext
    events = [[ev.enter, token, context], [ev.exit, token, context]]

    resolveAll = vi.fn<Resolver>(() => events)
    constructs = [{ resolveAll }, { resolveAll }]
  })

  it('should call `resolveAll` resolvers', () => {
    // Act
    testSubject(constructs as unknown as Construct[], events, context)

    // Expect
    expect(resolveAll).toHaveBeenCalledOnce()
    expect(resolveAll).toHaveBeenCalledWith(events, context)
  })
})
