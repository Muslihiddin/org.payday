import type { EmployeeStatus } from '../../types/index'

export type EmployeeUpdatePayload = {
  status: EmployeeStatus
  comment?: string
  salary?: number
  percentAllowed?: number
}
