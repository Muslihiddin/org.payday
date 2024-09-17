import { LayoutDashboardIcon, Users2Icon, CoinsIcon, HandCoinsIcon } from 'lucide-vue-next'

import type { LinkProp } from '..'

export const links: LinkProp[] = [
  {
    name: 'Dashboard',
    location: 'home',
    icon: LayoutDashboardIcon
  },
  {
    name: 'Employees',
    location: 'employees-list',
    icon: Users2Icon
  },
  {
    name: 'Payments',
    location: 'payments-list',
    icon: CoinsIcon
  },
  {
    name: 'Requests',
    location: 'requests-list',
    icon: HandCoinsIcon
  }
]
