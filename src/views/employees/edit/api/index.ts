import type { EmployeeUpdatePayload } from '../types'

import api from '@/api'
const url = '/api/employees'

export const updateEmployee = async ({
  id,
  payload
}: {
  id: string
  payload: EmployeeUpdatePayload
}) => {
  const res = await api.put(`${url}/${id}`, payload)
  return res
}
