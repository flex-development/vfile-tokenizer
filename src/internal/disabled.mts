/**
 * @file Internal - disabled
 * @module fsm-tokenizer/internal/disabled
 */

import type { List } from '@flex-development/fsm-tokenizer'

/**
 * Check if a construct is disabled.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {List<string> | null | undefined} list
 *  List of disabled construct names
 * @param {string | null | undefined} name
 *  Construct name, if any
 * @return {boolean}
 *  `true` if construct is disabled, `false` otherwise
 */
function disabled(
  this: void,
  list: List<string> | null | undefined,
  name: string | null | undefined
): boolean {
  /**
   * Whether the construct is disabled.
   *
   * @var {boolean} disabled
   */
  let disabled: boolean = false

  if (name !== null && name !== undefined && list) {
    disabled = [...list].includes(name)
  }

  return disabled
}

export default disabled
