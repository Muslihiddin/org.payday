export const routes = [
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'login' },
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/login')
      },
      {
        path: 'registration',
        name: 'registration',
        component: () => import('@/views/auth/registration')
      }
    ]
  },
  {
    path: '',
    name: 'main',
    redirect: { name: 'home' },
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/dashboard')
      },
      {
        path: '/employees',
        name: 'employees-list',
        component: () => import('@/views/employees/list')
      },
      {
        path: '/employee/create',
        name: 'employees-create',
        component: () => import('@/views/employees/create')
      },
      {
        path: '/employees/upload',
        name: 'employees-upload',
        component: () => import('@/views/employees/upload-list')
      },
      {
        path: '/payments',
        name: 'payments-list',
        component: () => import('@/views/payments/list')
      },
      {
        path: '/attendances',
        name: 'attendances-list',
        component: () => import('@/views/attendances/list')
      },
      {
        path: '/requests',
        name: 'requests-list',
        component: () => import('@/views/requests/list')
      },
      {
        path: '/attendances',
        name: 'attendances-list',
        component: () => import('@/views/attendances/list')
      }
    ]
  }
]
