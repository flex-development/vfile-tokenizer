/**
 * @file Type Aliases - Value
 * @module vfile-tokenizer/types/Value
 */

/**
 * The contents of a file.
 *
 * Can either be text, or a {@linkcode Uint8Array} like structure.
 */
type Value = Uint8Array | string

export type { Value as default }
