import type { Identifier, EmployeeStatus } from '../../types'

export type CreateEmployeeModel = {
  cardNumber?: string | null
  identifiers?: Identifier[] | null
  status: EmployeeStatus
  comment?: string | null
  salary: number
  percentAllowed: number
}
