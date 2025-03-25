/**
 * @file Type Aliases - CreateInitialConstruct
 * @module fsm-tokenizer/types/CreateInitialConstruct
 */

import type { InitialConstruct } from '@flex-development/fsm-tokenizer'

/**
 * Create an initial construct.
 *
 * @see {@linkcode InitialConstruct}
 *
 * @this {void}
 *
 * @return {InitialConstruct}
 *  Initial construct
 */
type CreateInitialConstruct = (this: void) => InitialConstruct

export type { CreateInitialConstruct as default }
