import { filter, identity, always, reject, isNil, flip, contains } from 'ramda'

export const compact = filter(identity)

export const noop = always(undefined)

export const isOneOf = flip(contains)

export const filterNil = reject(isNil)
