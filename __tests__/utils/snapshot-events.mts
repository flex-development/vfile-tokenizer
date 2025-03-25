/**
 * @file Test Utilities - snapshotEvents
 * @module tests/utils/snapshotEvents
 */

import type { Event, EventType, Token } from '@flex-development/fsm-tokenizer'

/**
 * Get a snapshot-compliant list of events.
 *
 * @this {void}
 *
 * @param {Event[]} events
 *  List of events
 * @return {[EventType, Token][]}
 *  List of event types and tokens
 */
function snapshotEvents(this: void, events: Event[]): [EventType, Token][] {
  return events.map(event => [event[0], event[1]])
}

export default snapshotEvents
