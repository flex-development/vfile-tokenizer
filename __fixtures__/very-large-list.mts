/**
 * @file Fixtures - veryLargeList
 * @module fixtures/veryLargeList
 */

import constants from '#enums/constants'

/**
 * A very large list.
 *
 * @type {unknown[]}
 */
export default Array.from({ length: constants.v8MaxSafeChunkSize })
