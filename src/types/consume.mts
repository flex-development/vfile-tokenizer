/**
 * @file Type Aliases - Consume
 * @module vfile-tokenizer/types/Consume
 */

import type { Code } from '@flex-development/vfile-tokenizer'

/**
 * Deal with a character `code` and move onto the next.
 *
 * @see {@linkcode Code}
 *
 * @this {void}
 *
 * @param {Code} code
 *  The character code to consume
 * @return {undefined}
 */
type Consume = (this: void, code: Code) => undefined

export type { Consume as default }
