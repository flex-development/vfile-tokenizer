/**
 * @file Enums - codes
 * @module vfile-tokenizer/enums/codes
 */

import type { Code } from '@flex-development/vfile-tokenizer'

/**
 * Character codes.
 *
 * This module contains constants for the ASCII block and the replacement
 * character.
 *
 * A few codes can be handled in a special way, such as line endings (CR, LF,
 * and CR+LF, commonly known as end-of-line: EOLs), as well as tab (horizontal
 * tab) and its expansion based on what column it’s at (virtual space).
 *
 * @see {@linkcode Code}
 * @see https://symbl.cc/en/unicode/blocks/basic-latin
 * @see https://symbl.cc/en/unicode/blocks/latin-1-supplement
 * @see https://util.unicode.org/UnicodeJsps/character.jsp
 * @see https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp
 *
 * @enum {Code}
 */
const codes = {
  eof: null,
  break: -13, // stream break
  vcr: -5, // virtual carriage return (\r)
  vlf: -4, // virtual line feed (\n)
  crlf: -3, // carriage return + line feed (\r + \n)
  vht: -2, // virtual horizontal tab (\t)
  vs: -1, // virtual space
  nul: 0,
  soh: 1,
  stx: 2,
  etx: 3,
  eot: 4,
  enq: 5,
  ack: 6,
  bel: 7,
  bs: 8,
  ht: 9, // \t
  lf: 10, // \n
  vt: 11, // \v
  ff: 12, // \f
  cr: 13, // \r
  so: 14,
  si: 15,
  dle: 16,
  dc1: 17,
  dc2: 18,
  dc3: 19,
  dc4: 20,
  nak: 21,
  syn: 22,
  etb: 23,
  can: 24,
  em: 25,
  sub: 26,
  esc: 27,
  fs: 28,
  gs: 29,
  rs: 30,
  us: 31,
  space: 32,
  exclamation: 33, // !
  quotation: 34, // "
  hash: 35, // #
  dollar: 36, // $
  percent: 37, // %
  ampersand: 38, // &
  apostrophe: 39, // '
  leftParen: 40, // (
  rightParen: 41, // )
  asterisk: 42, // *
  plus: 43, // +
  comma: 44, // ,
  hyphen: 45, // -
  minus: 45, // -
  dot: 46, // .
  slash: 47, // /
  digit0: 48, // 0
  digit1: 49, // 1
  digit2: 50, // 2
  digit3: 51, // 3
  digit4: 52, // 4
  digit5: 53, // 5
  digit6: 54, // 6
  digit7: 55, // 7
  digit8: 56, // 8
  digit9: 57, // 9
  colon: 58, // =
  semicolon: 59, // ;
  leftAngleBracket: 60, // <
  lt: 60, // <
  equal: 61, // =
  gt: 62, // >
  rightAngleBracket: 62, // >
  question: 63, // ?
  at: 64, // @
  uppercaseA: 65, // A
  uppercaseB: 66, // B
  uppercaseC: 67, // C
  uppercaseD: 68, // D
  uppercaseE: 69, // E
  uppercaseF: 70, // F
  uppercaseG: 71, // G
  uppercaseH: 72, // H
  uppercaseI: 73, // I
  uppercaseJ: 74, // J
  uppercaseK: 75, // K
  uppercaseL: 76, // L
  uppercaseM: 77, // M
  uppercaseN: 78, // N
  uppercaseO: 79, // O
  uppercaseP: 80, // P
  uppercaseQ: 81, // Q
  uppercaseR: 82, // R
  uppercaseS: 83, // S
  uppercaseT: 84, // T
  uppercaseU: 85, // U
  uppercaseV: 86, // V
  uppercaseW: 87, // W
  uppercaseX: 88, // X
  uppercaseY: 89, // Y
  uppercaseZ: 90, // Z
  leftBracket: 91, // [
  backslash: 92, // \
  rightBracket: 93, // ]
  caret: 94, // ^
  underscore: 95, // _
  graveAccent: 96, // `
  lowercaseA: 97, // a
  lowercaseB: 98, // b
  lowercaseC: 99, // c
  lowercaseD: 100, // d
  lowercaseE: 101, // e
  lowercaseF: 102, // f
  lowercaseG: 103, // g
  lowercaseH: 104, // h
  lowercaseI: 105, // i
  lowercaseJ: 106, // j
  lowercaseK: 107, // k
  lowercaseL: 108, // l
  lowercaseM: 109, // m
  lowercaseN: 110, // n
  lowercaseO: 111, // o
  lowercaseP: 112, // p
  lowercaseQ: 113, // q
  lowercaseR: 114, // r
  lowercaseS: 115, // s
  lowercaseT: 116, // t
  lowercaseU: 117, // u
  lowercaseV: 118, // v
  lowercaseW: 119, // w
  lowercaseX: 120, // x
  lowercaseY: 121, // y
  lowercaseZ: 122, // z
  leftBrace: 123, // {
  bar: 124, // |
  rightBrace: 125, // }
  tilde: 126, // ~
  del: 127,
  nbsp: 160, // \u00A0
  zwnj: 8204, // \u200C
  zwj: 8205, // \u200D
  ls: 8232, // \u2028
  ps: 8233, // \u2029
  bom: 65_279, // byte order marker
  replacement: 65_533 // �
} as const

export default codes
