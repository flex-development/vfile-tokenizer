import type {} from '@flex-development/vfile-tokenizer'

declare module '@flex-development/vfile-tokenizer' {
  import type tt from '#fixtures/tt'

  interface TokenFields {
    /**
     * Token value.
     *
     * @internal
     */
    value?: string | null | undefined
  }

  interface TokenTypeMap {
    eof: tt.eof
    typeMetadata: tt.typeMetadata
  }
}
