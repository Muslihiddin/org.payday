import { Identifier } from '../../types'

export type EmployeesJSON = {
  account?: string
  comment?: string
  card?: string
  mfo?: string
  pinfl?: string
  phone?: string
  passport?: string
  salary?: string
  percent?: string
  inn?: string
}

export type EmployeeSendListPayload = {
  cardNumber: string
  identifiers: Identifier[]
  comment: string
  salary: number
  percentAllowed: number
}

export type EmployeeSendListResponse = {
  request: EmployeeSendListPayload
  result: {
    isSuccess: boolean
    error: {
      code: string
      message?: string
      errors: string[]
    }
  }
}
