import type { AttendanceFetchResponse, AttendanceTableData } from '../types'

import { useDateFormat } from '@vueuse/core'

export let uniqueDates: Set<string> = new Set()

const sortByDesc = (arr: string[]) => {
  return arr.sort((a, b) => (a > b ? -1 : 1))
}

export const prepareTableData = (data: AttendanceFetchResponse[]) => {
  uniqueDates.clear()

  data.forEach((item) => {
    if (item.attendances.length) {
      item.attendances.forEach((el) => {
        if (el.date) {
          uniqueDates.add(el.date)
        }
      })
    }
  })

  uniqueDates = new Set(sortByDesc(Array.from(uniqueDates)))

  let result: AttendanceTableData[] = []

  data.forEach((item) => {
    let temp: { [key: string]: string } = {}
    uniqueDates.forEach((date) => {
      temp[date] = ''
      item.attendances.forEach((attendance) => {
        if (attendance.date === date) {
          const checkInTime = attendance.checkInTime
            ? `${useDateFormat(attendance.checkInTime, 'HH:mm').value}`
            : ''
          const checkOutTime = attendance.checkOutTime
            ? `, ${useDateFormat(attendance.checkOutTime, 'HH:mm').value}`
            : ''
          const status = attendance.status ? ` ${attendance.status}` : ''
          const tardinessReason = attendance.tardinessReason ? ` ${attendance.tardinessReason}` : ''
          temp[date] = checkInTime + checkOutTime + status + tardinessReason
        }
      })
    })
    result.push({
      fio: item.employee.user
        ? `${item.employee.user.lastName} ${item.employee.user.firstName}`
        : '',
      ...temp
    })
  })

  return result
}
