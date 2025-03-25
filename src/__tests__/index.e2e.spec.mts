/**
 * @file E2E Tests - api
 * @module fsm-tokenizer/tests/e2e/api
 */

import * as testSubject from '@flex-development/fsm-tokenizer'

describe('e2e:fsm-tokenizer', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
