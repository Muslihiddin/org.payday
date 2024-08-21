export type Identifier = {
  type: 'phoneNumber' | 'inn' | 'passportSerialNumber' | 'pinfl' | 'accountCredit' | 'mfo'
  value: string
}

export type EmployeeStatus = 'active' | 'blocked' | 'leftTheCompany'
