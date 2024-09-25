import { useMutation } from '@tanstack/vue-query'
import { updateOrganizationOptions } from '../api'
import { OrganizationSalaryModel } from '../types'

export const useUpdateOrganizationOptions = () => {
  return useMutation({
    mutationFn: (payload: OrganizationSalaryModel) => updateOrganizationOptions(payload)
  })
}
