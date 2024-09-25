import type { AxiosResponse } from 'axios'
import type {
  OrganizationModelResponse,
  OrganizationSalaryResponse,
  OrganizationSalaryModel
} from '../types'

import api from '@/api'
const url = 'api/organizations'

export const getOrganization = async (): Promise<AxiosResponse<OrganizationModelResponse>> => {
  const response = await api(url)
  return response
}

export const getOrganizationOptions = async (): Promise<
  AxiosResponse<OrganizationSalaryResponse>
> => {
  const response = await api(`${url}/options`)
  return response
}

export const updateOrganizationOptions = async (payload: OrganizationSalaryModel) => {
  const response = await api.put(`${url}/options`, payload)
  return response
}
