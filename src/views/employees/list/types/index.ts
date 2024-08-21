import type { Identifier, EmployeeStatus } from '../../types'

export type Employee = {
  id: string
  organizationId: string
  userId: number
  identifiers: Identifier[]
  user: User
  createdAt: string
  updatedAt: string
  status: EmployeeStatus
  comment: string
  salary: number
  percentAllowed: number
  card: EmployeeCard
}

type User = {
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

type EmployeeCard = {
  id: string
  phoneNumber: string
  owner: string
  cardName: string
  maskedNumber: string
}

export type FetchEmployeesParams = {
  organizationId?: string
  fromCreatedAt?: string
  toCreatedAt?: string
  userId?: number
  size: number
  page: number
  isAll?: boolean
  orderBy?: string
  order?: 'asc' | 'desc'
}

type ApiError = {
  code?: string
  message?: string
  errors?: string[]
}

export type EmployeeModelIEnumerableResult = {
  isSuccess: boolean
  error: ApiError
  data?: Employee[]
}
