/**
 * @file Interfaces - Place
 * @module fsm-tokenizer/interfaces/Place
 */

import type { RangeInfo } from '@flex-development/fsm-tokenizer'
import type { Point } from '@flex-development/vfile-location'

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
