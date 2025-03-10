/**
 * @file Interfaces - TokenFields
 * @module vfile-tokenizer/interfaces/TokenFields
 */

/**
 * Token fields registry.
 *
 * This interface can be augmented to register custom token fields.
 *
 * @example
 *  declare module '@flex-development/vfile-tokenizer' {
 *    interface TokenFields {
 *      value?: string | null
 *    }
 *  }
 */
interface TokenFields {}

export type { TokenFields as default }
