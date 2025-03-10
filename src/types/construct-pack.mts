/**
 * @file Type Aliases - ConstructPack
 * @module vfile-tokenizer/types/ConstructPack
 */

import type { Construct } from '@flex-development/vfile-tokenizer'

/**
 * A single construct or a list of constructs.
 *
 * @see {@linkcode Construct}
 */
type ConstructPack = Construct | Construct[]

export type { ConstructPack as default }
