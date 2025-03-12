/**
 * @file Internal - onsuccessfulcheck
 * @module vfile-tokenizer/internal/onsuccessfulcheck
 */

import type { Info } from '@flex-development/vfile-tokenizer'

/**
 * Discard results.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {unknown} construct
 *  The successful construct
 * @param {Info} info
 *  Internal state
 * @return {undefined}
 */
function onsuccessfulcheck(
  this: void,
  construct: unknown,
  info: Info
): undefined {
  return void info.restore()
}

export default onsuccessfulcheck
