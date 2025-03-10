/**
 * @file Type Aliases - Encoding
 * @module vfile-tokenizer/types/Encoding
 */

/**
 * Encodings supported by {@linkcode TextDecoder}.
 *
 * > 👉 Arbitrary encodings can be supported depending on how the engine is
 * > built, so any string *could* be valid.
 *
 * @see https://nodejs.org/api/util.html#whatwg-supported-encodings
 */
type Encoding =
  | 'unicode-1-1-utf-8' // always supported in node
  | 'utf-16be' // not supported when ICU is disabled
  | 'utf-16le' // always supported in node
  | 'utf-8' // always supported in node
  | 'utf16' // always supported in node
  | 'utf8' // always supported in node
  | (string & {}) // everything else (depends on browser, or full ICU data)

export type { Encoding as default }
