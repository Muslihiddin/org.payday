import type { Employee } from '../types'
import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'
import { formatPhoneNumber, prettify } from '@/lib/utils'

export const columns: ColumnDef<Employee>[] = [
  {
    id: 'rowNumber',
    header: () => h('div', {}, 'No.'),
    cell: ({ row }) => {
      const rowNumber = row.index + 1
      return h('div', {}, rowNumber)
    }
  },
  {
    id: 'fullName',
    header: () => h('div', {}, 'F.I.O'),
    cell: ({ row }) => {
      if (row.original.user) {
        const lastName = row.original.user.lastName
        const firstName = row.original.user.firstName
        return h('div', { class: 'font-medium' }, `${lastName} ${firstName}`)
      } else {
        return h('div', { class: 'italic text-muted-foreground' }, 'Not provided')
      }
    }
  },
  {
    id: 'phoneNumber',
    header: () => h('div', {}, 'Phone number'),
    cell: ({ row }) => {
      if (row.original.user?.phoneNumber) {
        const phone = formatPhoneNumber(row.original.user.phoneNumber)
        return h('div', { class: 'font-medium tabular-nums' }, phone)
      } else {
        return h('div', { class: 'italic text-muted-foreground' }, 'Not provided')
      }
    }
  },
  {
    id: 'pinfl',
    header: () => h('div', {}, 'PINFL'),
    cell: ({ row }) => {
      const pinfl = row.original.identifiers?.find((el) => el.type === 'pinfl')?.value
      return pinfl
        ? h('div', { class: 'font-medium tabular-nums' }, pinfl)
        : h('div', { class: 'italic text-muted-foreground' }, 'Not provided')
    }
  },
  {
    id: 'passport',
    header: () => h('div', {}, 'Passport'),
    cell: ({ row }) => {
      const passport = row.original.identifiers?.find(
        (el) => el.type === 'passportSerialNumber'
      )?.value
      return passport
        ? h('div', { class: 'font-medium tabular-nums' }, passport)
        : h('div', { class: 'italic text-muted-foreground' }, 'Not provided')
    }
  },
  {
    id: 'salary',
    header: () => h('div', {}, 'Salary'),
    cell: ({ row }) => {
      const salary = prettify(row.original.salary)
      return salary
        ? h('div', { class: 'font-medium' }, salary)
        : h('div', { class: 'italic text-muted-foreground' }, 'Not provided')
    }
  },
  {
    id: 'percent',
    header: () => h('div', {}, 'Percent'),
    cell: ({ row }) => {
      const percent = prettify(row.original.percentAllowed)
      return percent
        ? h('div', { class: 'font-medium' }, `${percent}%`)
        : h('div', { class: 'italic text-muted-foreground' }, 'Not provided')
    }
  },
  {
    id: 'status',
    header: () => h('div', {}, 'Status'),
    cell: ({ row }) => {
      const status = row.original.status
      const statusClr =
        status === 'active'
          ? 'font-medium text-green-600 capitalize'
          : status === 'blocked'
            ? 'font-medium text-red-600 capitalize'
            : ''
      return status
        ? h('div', { class: statusClr }, status)
        : h('div', { class: 'italic text-muted-foreground' }, 'Not provided')
    }
  }
]
