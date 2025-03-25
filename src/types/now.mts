/**
 * @file Type Aliases - Now
 * @module fsm-tokenizer/types/Now
 */

import type { Place } from '@flex-development/fsm-tokenizer'

/**
 * Get the current point in the file.
 *
 * @see {@linkcode Place}
 *
 * @this {void}
 *
 * @return {Place}
 *  Current place in file
 */
type Now = (this: void) => Place

export type { Now as default }
