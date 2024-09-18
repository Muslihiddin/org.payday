import { useQuery } from '@tanstack/vue-query'
import { fetchAttendances } from '../api'

import type { AttendancesFetchParams } from '../types'

export const useGetAttendances = (params: AttendancesFetchParams) => {
  return useQuery({
    queryKey: ['attendances', params],
    queryFn: () => fetchAttendances(params)
  })
}
