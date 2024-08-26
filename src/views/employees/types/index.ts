export type EmployeeModel = {
  id: string
  organizationId: string
  userId?: number
  identifiers?: Identifier[]
  user: User
  createdAt: string
  updatedAt: string
  status: EmployeeStatus
  comment?: string
  salary: number
  percentAllowed: number
  card: EmployeeCard
}

export type Identifier = {
  type: 'phoneNumber' | 'inn' | 'passportSerialNumber' | 'pinfl' | 'accountCredit' | 'mfo'
  value: string
}

export type EmployeeStatus = 'active' | 'blocked' | 'leftTheCompany'

export type ApiError = {
  code?: string
  message?: string
  errors?: string[]
}

export type User = {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
  organization: SalaryPaymentOrganization
}

type SalaryPaymentOrganization = {
  id: string
  name: string
}

export type EmployeeCard = {
  id: string
  phoneNumber?: string
  owner?: string
  cardName?: string
  maskedNumber?: string
}
