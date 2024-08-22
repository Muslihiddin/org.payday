import api from '@/api'
import { useMutation } from '@tanstack/vue-query'
import { CreatePayments } from '../api'
import type { PayloadPayments } from '../types'

export const useCreatePayments = () => {
  return useMutation({
    mutationFn: (data: PayloadPayments) => CreatePayments(data)
  })
}
