import type { Identifier, EmployeeStatus, ApiError, EmployeeModel } from '../../types'

export type CreateEmployeeModel = {
  cardNumber?: string | null
  identifiers?: Identifier[] | null
  status: EmployeeStatus
  comment?: string | null
  salary: number
  percentAllowed: number
}

export type EmployeeModelResult = {
  isSuccess: boolean
  error: ApiError
  data: EmployeeModel
}
