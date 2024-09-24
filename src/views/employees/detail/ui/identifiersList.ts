import type { Identifier } from '../../types'

export const identifiersList: { label: string; fieldName: Identifier['type'] }[] = [
  {
    fieldName: 'phoneNumber',
    label: 'Phone number'
  },
  {
    fieldName: 'passportSerialNumber',
    label: 'Passport serial number'
  },
  {
    fieldName: 'inn',
    label: 'INN'
  },
  {
    fieldName: 'pinfl',
    label: 'PINFL'
  },
  {
    fieldName: 'accountCredit',
    label: 'Credit details'
  },
  {
    fieldName: 'mfo',
    label: 'MFO'
  }
]
