import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { clearLoginToken } from '@/lib/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})

const userShouldLogin = (): boolean => {
  const isTokenAvailable = localStorage.getItem('token')
  if (isTokenAvailable) {
    const expire = localStorage.getItem('tokenExpire')
    if (expire) {
      const expireTime = new Date(expire)
      const now = new Date()
      return expireTime < now
    } else {
      return true
    }
  } else {
    return true
  }
}

router.beforeEach((to) => {
  if (to.name === 'register' || to.name === 'auth-otp-confirmation') {
    clearLoginToken()
    return true
  } else if (to.name !== 'login' && userShouldLogin()) {
    clearLoginToken()
    return { name: 'login' }
  } else {
    return true
  }
})

export default router
