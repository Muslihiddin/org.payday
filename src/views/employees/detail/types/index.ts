import type { EmployeeModel } from '../../types'

export type GetEmployeeByIdParams = { id: string }

export type GetEmployeeByIdResponse = {
  isSuccess: boolean
  error: {
    code?: string
    message?: string
    errors?: string[]
  }
  data: EmployeeModel
}

export type GetEmployeeSalaryParams = { id: string }

export type GetEmployeeSalaryResponse = {
  isSuccess: boolean
  error: {
    code: string
    message: string
    errors: string[]
  }
  data: EmployeeSalaryModel
}

export type EmployeeSalaryModel = {
  workingDaysInMonth: number
  salaryPerDay: number
  workedDaysToToday: number
  earnedSalary: number
  enableSalary: number
  paidSalary: number
  requestedSalary: number
}

export type DeleteEmployeePayload = { id: string }

export type DeleteEmployeeResponse = {
  isSuccess: boolean
  error: {
    code: string
    message: string
    errors: string[]
  }
  data: EmployeeModel
}
