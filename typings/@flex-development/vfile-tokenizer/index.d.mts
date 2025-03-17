import type {} from '@flex-development/vfile-tokenizer'

declare module '@flex-development/vfile-tokenizer' {
  interface TokenInfo {
    emoji?: string | null | undefined
  }

  interface TokenFields {
    attached?: boolean | null | undefined
    long?: boolean | null | undefined
    value?: string | null | undefined
  }

  interface TokenTypeMap {
    eof: 'eof'
    flag: 'flag'
    id: 'id'
    lineEnding: 'lineEnding'
    operand: 'operand'
    shortcode: 'shortcode'
  }

  interface TokenizeContext {
    delimiter?: boolean | null | undefined
  }
}
