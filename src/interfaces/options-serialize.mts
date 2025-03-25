/**
 * @file Interfaces - SerializeOptions
 * @module fsm-tokenizer/interfaces/SerializeOptions
 */

/**
 * Options for serializing chunks.
 */
interface SerializeOptions {
  /**
   * A string representing a serialized stream break, a boolean indicating
   * whether the stream break code should be serialized to a space (` `) rather
   * than an empty string, or `null` to error on serialization attempt.
   *
   * @default null
   */
  breaks?: boolean | string | null | undefined

  /**
   * Whether to expand tabs.
   */
  expandTabs?: boolean | null | undefined
}

export type { SerializeOptions as default }
