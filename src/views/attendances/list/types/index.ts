import { EmployeeModel } from '@/views/employees/types'

export type AttendanceTableData = { fio: string; [key: string]: string }

export type Attendance = {
  id: string
  employeeId: string
  createdAt: string
  date?: string
  status: AttendancesStatus
  checkInTime?: string
  checkOutTime?: string
  tardinessReason?: string
}

export type AttendancesFetchParams = {
  employeeId?: string
  organizationId?: string
  fromDate?: string
  toDate?: string
  date?: string
  status?: AttendancesStatus
  note?: AttendancesNotes
  orderBy?: string
  order?: 'asc' | 'desc'
  size: number
  page: number
  isAll?: boolean
}

export type AttendanceFetchResponse = {
  employee: EmployeeModel
  attendances: Attendance[]
}

export type AttendancesStatus =
  | 'none'
  | 'worked'
  | 'absent'
  | 'workFromHome'
  | 'businessTrip'
  | 'sickLeave'
  | 'vacation'

export type AttendancesNotes =
  | 'none'
  | 'onTimeArrival'
  | 'lateArrival'
  | 'earlyCome'
  | 'leftOnTime'
  | 'leftEarly'
  | 'leftLate'
