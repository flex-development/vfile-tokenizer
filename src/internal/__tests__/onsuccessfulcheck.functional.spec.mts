/**
 * @file Functional Tests - onsuccessfulcheck
 * @module fsm-tokenizer/internal/tests/functional/onsuccessfulcheck
 */

import testSubject from '#internal/onsuccessfulcheck'
import type { Info, Restore } from '@flex-development/fsm-tokenizer'
import type { MockInstance } from 'vitest'

describe('functional:internal/onsuccessfulcheck', () => {
  let info: Info
  let restore: MockInstance<Restore>

  beforeEach(() => {
    restore = vi.fn().mockName('restore')
    info = { from: Number.NaN, restore: restore as unknown as Restore }
  })

  it('should restore internal state', () => {
    // Act
    testSubject(null, info)

    // Expect
    expect(restore).toHaveBeenCalledOnce()
    expect(restore.mock.lastCall).to.eql([])
  })
})
