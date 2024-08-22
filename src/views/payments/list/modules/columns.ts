import type { Payments } from '../types'
import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'
import { formatPhoneNumber, prettify } from '@/lib/utils'
import { useDateFormat } from '@vueuse/core'

export const columns: ColumnDef<Payments>[] = [
  {
    id: 'rowNumber',
    header: () => h('div', {}, 'No.'),
    cell: ({ row }) => {
      const rowNumber = row.index + 1
      return h('div', {}, rowNumber)
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
    id: 'date',
    header: () => h('div', {}, 'Date'),
    cell: ({ row }) => {
      if (row.original.createdAt) {
        const date = useDateFormat(row.original.createdAt, 'YYYY/MM/DD HH:mm')

        return h('div', { class: 'font-medium' }, `${date.value}`)
      } else {
        return h('div', { class: 'italic text-muted-foreground' }, 'Not provided')
      }
    }
  },
  {
    id: 'type',
    header: () => h('div', {}, 'Type'),
    cell: ({ row }) => {
      if (row.original.paymentType) {
        const type = row.original.paymentType
        return h(
          'div',
          { class: 'font-medium' },
          `${type === 'byEmployeeRequest' ? 'By employee request' : 'Monthly salary'}`
        )
      } else {
        return h('div', { class: 'italic text-muted-foreground' }, 'Not provided')
      }
    }
  },
  {
    id: 'amount',
    header: () => h('div', {}, 'Amount'),
    cell: ({ row }) => {
      if (row.original.amount) {
        const amount = prettify(row.original.amount)
        return h('div', { class: 'font-medium' }, `${amount}`)
      } else {
        return h('div', { class: 'italic text-muted-foreground' }, 'Not provided')
      }
    }
  }
]
