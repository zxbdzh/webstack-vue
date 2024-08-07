import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router/index.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const Avatar = ref(
      'https://picgo.cn-sy1.rains3.com/2024/08/a3afdbb7f0c3ada619fdfe7d16692fab.jpg'
    )
    const token = ref('')
    const AlreadyGuide = ref(false)
    const AlreadyGuideUpdatePwd = ref(false)
    const username = ref('')
    const Logout = async () => {
      await router.push('/')
      window.location.reload()
    }
    return { Avatar, token, AlreadyGuide, username, Logout, AlreadyGuideUpdatePwd }
  },
  {
    persist: true
  }
)
