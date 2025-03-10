/**
 * @file E2E Tests - api
 * @module vfile-tokenizer/tests/e2e/api
 */

import * as testSubject from '@flex-development/vfile-tokenizer'

describe('e2e:vfile-tokenizer', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
