/**
 * @file Test Utilities - isToken
 * @module tests/utils/isToken
 */

import isPoint from '#tests/utils/is-point'
import type { Token } from '@flex-development/vfile-tokenizer'

/**
 * Check if `value` looks like a {@linkcode Token}.
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is Token}
 *  `true` if `value` looks like a `Token`, `false` otherwise
 */
function isToken(this: void, value: unknown): value is Token {
  return (
    check(value) &&
    (value.next === undefined || check(value.next)) &&
    (value.previous === undefined || check(value.previous))
  )

  /**
   * Check if `value` is token like.
   *
   * @this {void}
   *
   * @param {unknown} value
   *  The thing to check
   * @return {value is Token}
   *  `true` if `value` is token like
   */
  function check(this: void, value: unknown): value is Token {
    return (
      typeof value === 'object' &&
      value !== null &&
      'end' in value &&
      'type' in value &&
      'start' in value &&
      isPoint(value.end) &&
      isPoint(value.start) &&
      typeof value.type === 'string'
    )
  }
}

export default isToken
