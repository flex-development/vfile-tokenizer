/**
 * @file Type Tests - Encoding
 * @module fsm-tokenizer/types/tests/unit-d/Encoding
 */

import type TestSubject from '#types/encoding'

describe('unit-d:types/Encoding', () => {
  it('should extract "unicode-1-1-utf-8"', () => {
    expectTypeOf<TestSubject>().extract<'unicode-1-1-utf-8'>().not.toBeNever()
  })

  it('should extract "utf-16be"', () => {
    expectTypeOf<TestSubject>().extract<'utf-16be'>().not.toBeNever()
  })

  it('should extract "utf-16le"', () => {
    expectTypeOf<TestSubject>().extract<'utf-16le'>().not.toBeNever()
  })

  it('should extract "utf-8"', () => {
    expectTypeOf<TestSubject>().extract<'utf-8'>().not.toBeNever()
  })

  it('should extract "utf16"', () => {
    expectTypeOf<TestSubject>().extract<'utf16'>().not.toBeNever()
  })

  it('should extract "utf8"', () => {
    expectTypeOf<TestSubject>().extract<'utf8'>().not.toBeNever()
  })
})
