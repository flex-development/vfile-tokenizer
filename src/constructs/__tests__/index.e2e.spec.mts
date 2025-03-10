/**
 * @file E2E Tests - constructs
 * @module vfile-tokenizer/constructs/tests/e2e/api
 */

import * as testSubject from '#constructs/index'

describe('e2e:constructs', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
