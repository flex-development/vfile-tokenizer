/**
 * @file Utilities - resolveAll
 * @module fsm-tokenizer/utils/resolveAll
 */

import type {
  Construct,
  Event,
  Resolver,
  TokenizeContext
} from '@flex-development/fsm-tokenizer'

/**
 * Call all `resolveAll`s.
 *
 * @see {@linkcode Construct.resolveAll}
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeContext}
 *
 * @category
 *  utils
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
     * @const {Resolver | null | undefined} resolver
     */
    const resolver: Resolver | null | undefined = constructs[i]!.resolveAll

    if (resolver && !called.includes(resolver)) {
      events = resolver(events, context)
      called.push(resolver)
    }
  }

  return events
}

export default resolveAll
