import Dashboard from '../views/Dashboard.vue'

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
        component: () => import('@/views/auth/login/index.vue')
      },
      {
        path: '/otp-confirmation/:id',
        name: 'auth-otp-confirmation',
        component: () => import('@/views/auth/OtpView.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/register/index.vue')
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
        component: Dashboard
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue')
      },
      {
        path: '/employees',
        name: 'employees-list',
        component: () => import('@/views/employees/list')
      },
      {
        path: '/employees/create',
        name: 'employees-create',
        component: () => import('@/views/employees/create')
      }
    ]
  }
]
