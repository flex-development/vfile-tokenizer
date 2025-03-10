/**
 * @file Utilities - resolveAll
 * @module vfile-tokenizer/utils/resolveAll
 */

import type {
  Construct,
  Event,
  Resolver,
  TokenizeContext
} from '@flex-development/vfile-tokenizer'

/**
 * Call all `resolveAll`s.
 *
 * @see {@linkcode Construct.resolveAll}
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeContext}
 *
 * @this {void}
 *
 * @param {Partial<Construct>[]} constructs
 *  List of constructs
 * @param {Event[]} events
 *  List of events
 * @param {TokenizeContext} context
 *  Tokenize context
 * @return {Event[]}
 *  List of changed events
 */
function resolveAll(
  this: void,
  constructs: Partial<Construct>[],
  events: Event[],
  context: TokenizeContext
): Event[] {
  /**
   * Called resolvers.
   *
   * @const {Resolver[]} called
   */
  const called: Resolver[] = []

  /**
   * Current index.
   *
   * @var {number} i
   */
  let i: number = -1

  while (++i < constructs.length) {
    /**
     * Resolver.
     *
     * @const {Resolver | null | undefined} resolve
     */
    const resolve: Resolver | null | undefined = constructs[i]!.resolveAll

    if (resolve && !called.includes(resolve)) {
      events = resolve(events, context)
      called.push(resolve)
    }
  }

  return events
}

export default resolveAll
