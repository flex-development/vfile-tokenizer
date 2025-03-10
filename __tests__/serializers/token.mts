/**
 * @file Snapshot Serializers - token
 * @module tests/serializers/token
 * @see https://vitest.dev/guide/snapshot
 */

import inspect from '#tests/utils/inspect'
import isToken from '#tests/utils/is-token'
import type { Token } from '@flex-development/vfile-tokenizer'
import { ok } from 'devlop'
import type { SnapshotSerializer } from 'vitest'

/**
 * Token snapshot serializer.
 *
 * @const {SnapshotSerializer} serializer
 */
const serializer: SnapshotSerializer = { print, test: isToken }

export default serializer

/**
 * Print a snapshot value.
 *
 * > 👉 **Note**: `value` is expected to be a {@linkcode Token}.
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The value to print
 * @return {string}
 *  Snapshot value
 */
function print(this: void, value: unknown): string {
  ok(isToken(value), 'expected token')
  return inspect(value)
}
