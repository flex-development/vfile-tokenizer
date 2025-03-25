/**
 * @file Type Aliases - ConstructPack
 * @module fsm-tokenizer/types/ConstructPack
 */

import type { Construct } from '@flex-development/fsm-tokenizer'

/**
 * A single construct or a list of constructs.
 *
 * @see {@linkcode Construct}
 */
type ConstructPack = Construct | Construct[]

export type { ConstructPack as default }
