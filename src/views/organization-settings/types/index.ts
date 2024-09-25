export type OrganizationModelResponse = {
  isSuccess: boolean
  error: Error
  data: OrganizationModel
}

export type OrganizationModel = {
  id: string
  upperId?: string
  name?: string
  registeredAt?: Date
  phone?: string
  status: OrganizationStatus
  tin?: string
  thsht?: number
  dbibt?: string
  ifut?: number
  locales?: Locale[]
  bankAccounts?: BankAccount[]
}

export type OrganizationStatus = 'undefined' | 'active' | 'ended'

export type BankAccount = {
  id: string
  organizationId: string
  account?: string
  bankId: number
  bankFilialId: number
  isActive: boolean
  isMain: boolean
  createdAt: Date
  updatedAt: Date
  accountBalance: BankAccountBalanceModel
}

export type BankAccountBalanceModel = {
  uzcardBalance: number
  humoBalance: number
  updatedAt?: Date
}

export type Locale = {
  orgId: string
  localeKey?: string
  title?: string
  logoSrc?: string
  executive?: string
  accountant?: string
  address?: string
  description?: string
  content?: string
}

export type Error = {
  code?: string
  message?: string
  errors?: string[]
}

export type OrganizationSalaryResponse = {
  isSuccess: boolean
  error: Error
  data: OrganizationSalaryModel
}

export type OrganizationSalaryModel = {
  weekends?: WeekendsModel[]
  balanceLimit?: number
  advancePercent: number
  latitude?: number
  longitude?: number
  locationRadius?: number
  dayShiftWorkStartTime?: string
  dayShiftWorkEndTime?: string
  eveningShiftWorkStartTime?: string
  eveningShiftWorkEndTime?: string
  qrCodeGenerateMode: QRCodeGenerateMode
  salaryDay: SalaryDayModel
  advanceDay: SalaryDayModel
}

export type WeekendsModel =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'

export type QRCodeGenerateMode = 'forever' | 'daily' | 'hourly' | 'minutely' | 'afterOneUse'

export type SalaryDayModel =
  | 'lastDay'
  | 'day1'
  | 'day2'
  | 'day3'
  | 'day4'
  | 'day5'
  | 'day6'
  | 'day7'
  | 'day8'
  | 'day9'
  | 'day10'
  | 'day11'
  | 'day12'
  | 'day13'
  | 'day14'
  | 'day15'
  | 'day16'
  | 'day17'
  | 'day18'
  | 'day19'
  | 'day20'
  | 'day21'
  | 'day22'
  | 'day23'
  | 'day24'
  | 'day25'
  | 'day26'
  | 'day27'
  | 'day28'
