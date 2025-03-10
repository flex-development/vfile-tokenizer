/**
 * @file Interfaces - TokenTypeMap
 * @module vfile-tokenizer/interfaces/TokenTypeMap
 */

/**
 * Token type registry.
 *
 * This interface can be augmented to register custom token types.
 *
 * @example
 *  declare module '@flex-development/vfile-tokenizer' {
 *    interface TokenTypeMap {
 *      whitespace: tt.whitespace
 *    }
 *  }
 */
interface TokenTypeMap {}

export type { TokenTypeMap as default }
