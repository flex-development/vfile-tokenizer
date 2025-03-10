/**
 * @file Interfaces - Effects
 * @module vfile-tokenizer/interfaces/Effects
 */

import type {
  Attempt,
  Consume,
  Enter,
  Exit
} from '@flex-development/vfile-tokenizer'

/**
 * Context object to transition the state machine.
 */
interface Effects {
  /**
   * Try to tokenize a construct.
   *
   * @see {@linkcode Attempt}
   */
  attempt: Attempt

  /**
   * Try to tokenize a construct, then revert.
   *
   * @see {@linkcode Attempt}
   */
  check: Attempt

  /**
   * Deal with a character code and move onto the next.
   *
   * @see {@linkcode Consume}
   */
  consume: Consume

  /**
   * Start a new token.
   *
   * @see {@linkcode Enter}
   */
  enter: Enter

  /**
   * Close an open token.
   *
   * @see {@linkcode Exit}
   */
  exit: Exit

  /**
   * Try to tokenize a construct, then revert.
   *
   * > 👉 **Note**: Sets `context.interrupt` to `true`.
   *
   * @see {@linkcode Attempt}
   */
  interrupt: Attempt
}

export type { Effects as default }
