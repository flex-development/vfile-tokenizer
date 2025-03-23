/**
 * @file Interfaces - Place
 * @module vfile-tokenizer/interfaces/Place
 */

import type { Point } from '@flex-development/vfile-location'
import type { RangeInfo } from '@flex-development/vfile-tokenizer'

/**
 * One place in a file, with additional chunk metadata.
 *
 * @see {@linkcode Point}
 * @see {@linkcode RangeInfo}
 *
 * @extends {Point}
 * @extends {RangeInfo}
 */
interface Place extends Point, RangeInfo {}

export type { Place as default }
