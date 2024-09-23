import type { Row, ColumnDef } from '@tanstack/vue-table'
import type { AttendanceTableData } from '../types'

import { h } from 'vue'
import { useDateFormat } from '@vueuse/core'

export const prepareColumns = (dates: Set<string>): ColumnDef<AttendanceTableData>[] => {
  const result = [
    {
      id: 'fio',
      header: () => h('p', {}, 'F.I.O'),
      cell: ({ row }: { row: Row<AttendanceTableData> }) => {
        if (row.original.fio) return h('p', { class: 'font-medium text-nowrap' }, row.original.fio)

        return h('p', { class: 'italic text-muted-foreground text-nowrap' }, 'Not provided')
      }
    }
  ]
  dates.forEach((date) => {
    result.push({
      id: date,
      header: () => {
        const formattedDate = useDateFormat(new Date(date), 'DD.MM.YYYY').value
        return h('p', {}, formattedDate)
      },
      cell: ({ row }) => {
        return h('p', { class: 'font-medium text-nowrap' }, row.original[date])
      }
    })
  })

  return result
}
