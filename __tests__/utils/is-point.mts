/**
 * @file Test Utilities - isPoint
 * @module tests/utils/isPoint
 */

import type { Point } from '@flex-development/vfile-location'

/**
 * Check if `value` looks like a {@linkcode Point}.
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is Point}
 *  `true` if `value` looks like a `Point`, `false` otherwise
 */
function isPoint(this: void, value: unknown): value is Point {
  return (
    typeof value === 'object' &&
    value !== null &&
    'column' in value &&
    'line' in value &&
    'offset' in value &&
    typeof value.column === 'number' &&
    typeof value.line === 'number' &&
    typeof value.offset === 'number'
  )
}

export default isPoint
