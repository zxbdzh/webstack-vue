<script setup>
import '@/assets/login.css'
import request from '@/utils/request.js'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'

const userStore = useUserStore()

// 加载
const loading = ref(false)

// 登录相关表单
const username = ref('')
const password = ref('')

// 登录函数
const login = async () => {
  loading.value = true
  const formData = new FormData()
  formData.set('username', username.value)
  formData.set('password', password.value)
  try {
    userStore.token = (await request.post('/user/login', formData)).data.data
    userStore.username = username.value
    userStore.Avatar = (await request.get('/user/userInfo')).data.data.avatar
  } finally {
    loading.value = false
  }
  await router.push('/')
  window.location.reload()
}

// 注册函数
const register = async () => {
  loading.value = true
  const formData = new FormData()
  formData.set('username', username.value)
  formData.set('password', password.value)
  try {
    await request.post('/user/register', formData)
  } finally {
    loading.value = false
  }
  await router.push('/')
  window.location.reload()
}
</script>

<template>
  <div class="box" v-loading="loading">
    <h2>Login</h2>
    <div class="input-box">
      <label>账号</label>
      <input v-model="username" type="text" />
    </div>
    <div class="input-box">
      <label>密码</label>
      <input v-model="password" type="password" @keyup.enter="login" />
    </div>
    <div class="btn-box">
      <a @click="$router.push('/user/console') && window.location.reload()">忘记密码?</a>
      <div>
        <button @click="login">登录</button>
        <button @click="register">注册</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
