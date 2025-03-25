/**
 * @file Interfaces - TokenFields
 * @module fsm-tokenizer/interfaces/TokenFields
 */

/**
 * Token fields registry.
 *
 * This interface can be augmented to register custom token fields.
 *
 * @example
 *  declare module '@flex-development/fsm-tokenizer' {
 *    interface TokenFields {
 *      value?: string | null
 *    }
 *  }
 */
interface TokenFields {}

export type { TokenFields as default }
