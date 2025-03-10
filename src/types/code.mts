/**
 * @file Type Aliases - Code
 * @module vfile-tokenizer/types/Code
 */

/**
 * A character code, with `null` denoting end of stream (eof).
 *
 * This often the same as what [`String#codePointAt`][codepointat] yields, but
 * meaning is added to other values as well. Negative integers can be used to
 * represent line endings and tabs.
 *
 * [codepointat]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
 */
type Code = number | null

export type { Code as default }
