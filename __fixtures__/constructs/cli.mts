/**
 * @file Constructs - cli
 * @module fixtures/constructs/cli
 */

import codes from '#enums/codes'
import longFlag from '#fixtures/constructs/flag-long'
import operand from '#fixtures/constructs/operand'
import type { ConstructRecord } from '@flex-development/vfile-tokenizer'

/**
 * CLI construct record.
 *
 * @const {ConstructRecord} cli
 */
const cli: ConstructRecord = { [codes.hyphen]: longFlag, null: operand }

export default cli
