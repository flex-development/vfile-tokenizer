/**
 * @file E2E Tests - enums
 * @module vfile-tokenizer/enums/tests/e2e/api
 */

import * as testSubject from '#enums/index'

describe('e2e:enums', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
