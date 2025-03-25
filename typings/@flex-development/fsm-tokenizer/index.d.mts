import type { Effects } from '@flex-development/fsm-tokenizer'

declare module '@flex-development/fsm-tokenizer' {
  interface TokenInfo {
    emoji?: string | null | undefined
  }

  interface TokenFields {
    attached?: boolean | null | undefined
    long?: boolean | null | undefined
    value?: string | null | undefined
  }

  interface TokenTypeMap {
    break: 'break'
    digit: 'digit'
    end: 'end'
    flag: 'flag'
    id: 'id'
    letter: 'letter'
    lineEnding: 'lineEnding'
    operand: 'operand'
    shortcode: 'shortcode'
  }

  interface TokenizeContext {
    delimiter?: boolean | null | undefined
    readonly effects: Effects
  }
}
