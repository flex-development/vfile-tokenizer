/**
 * @file Integration Tests - tokenize
 * @module vfile-tokenizer/tests/integration/tokenize
 */

import { initialize } from '#constructs/index'
import { chars } from '#enums/index'
import tt from '#fixtures/tt'
import {
  codeFenced,
  codeText,
  eof,
  lineEnding,
  micromark,
  typeMetadata
} from '#tests/constructs/index'
import finalizeContext from '#tests/utils/finalize-context'
import list from '#tests/utils/list'
import testSubject from '#tokenize'
import { resolveSlice, resolveTokenList } from '#utils/index'
import type {
  FileLike,
  TokenizeOptions,
  Value
} from '@flex-development/vfile-tokenizer'
import { readSync as read } from 'to-vfile'

describe('integration:tokenize', () => {
  it.each<[
    value?: FileLike | Value | null | undefined,
    options?: Partial<TokenizeOptions> | null | undefined
  ]>([
    [],
    [read('__fixtures__/markdown/empty.md')],
    [read('__fixtures__/markdown/code-fenced.md'), { tabSize: 2 }]
  ])('should work without constructs (%#)', (value, options) => {
    // Act
    const result = testSubject(value, {
      ...options,
      initialize: initialize({})
    })

    // Expect
    expect(result).to.be.an('array').that.is.empty
    expect(list(result[0]?.[1])).to.have.ordered.members(list(result))
  })

  it.each<[value: FileLike | Value, options: TokenizeOptions]>([
    [chars.lf + chars.cr + chars.crlf, {
      initialize: initialize(lineEnding)
    }],
    [read('__fixtures__/type-metadata.txt'), {
      disabled: [tt.eof],
      encoding: 'utf8',
      initialize: Object.assign(initialize([typeMetadata, eof]), {
        resolveAll: resolveSlice
      })
    }],
    [read('__fixtures__/markdown/code-indented.md'), {
      finalizeContext,
      initialize: () => initialize(micromark)
    }],
    [read('__fixtures__/markdown/code-text.md'), {
      encoding: 'utf8',
      initialize: initialize([codeFenced, codeText, eof])
    }]
  ])('should work with constructs (%#)', (value, options) => {
    // Act
    const result = resolveTokenList(testSubject(value, options))

    // Expect
    expect(result).to.be.an('array').that.is.not.empty
    expect(list(result[0]?.[1])).to.have.ordered.members(list(result))
    expect(result[0]![1]).toMatchSnapshot()
  })
})
