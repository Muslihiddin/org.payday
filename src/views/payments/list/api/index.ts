import api from '@/api'
import type {
  FetchPaymentsParams,
  PayloadPayments,
  Payments,
  PaymentsModelIEnumerableResult
} from '../types'
const url = 'api/salary-payments'

export const fetchPayments = async (params: FetchPaymentsParams) => {
  const { data } = await api<PaymentsModelIEnumerableResult>(url, { params })
  return data.data
}

export const CreatePayments = async (payload: PayloadPayments) => {
  const { data } = await api.post<Payments>(url, payload)
  return data
}
