import api from '@/api'
import { useQuery } from '@tanstack/vue-query'
import { fetchPayments } from '../api'
import type { FetchPaymentsParams } from '../types'

export const useGetPayments = (params: FetchPaymentsParams) => {
  return useQuery({
    queryKey: ['salery-payments', params],
    queryFn: () => fetchPayments(params)
  })
}
