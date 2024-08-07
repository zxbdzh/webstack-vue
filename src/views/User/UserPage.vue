<script setup>
import '@/assets/login.css'
import { onMounted, ref } from 'vue'
import request from '@/utils/request.js'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const isLoading = ref(false)

// 用户信息
const userStore = useUserStore()
const userInfo = ref({})
const password = ref('')
const newPassword = ref('')
const rePassword = ref('')

onMounted(async () => {
  userInfo.value = (await request.get('/user/userInfo')).data.data
  if (!userStore.AlreadyGuideUpdatePwd) {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#step-1',
          popover: {
            title: '用户主页引导',
            description: '点击此处修改头像',
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '#step-2',
          popover: {
            title: '用户主页引导',
            description: '填写表单后，点击此处修改密码',
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '#step-3',
          popover: {
            title: '用户主页引导',
            description: '点击此处返回主页',
            side: 'left',
            align: 'start'
          }
        }
      ],
      // onDestroyStarted is called when the user tries to exit the tour
      onDestroyStarted: () => {
        if (!driverObj.hasNextStep() || confirm('你确定退出引导吗？下次将无法引导！')) {
          driverObj.destroy()
        }
      }
    })
    driverObj.drive()
    userStore.AlreadyGuideUpdatePwd = true
  }
})

// 修改密码
const updatePwd = async () => {
  isLoading.value = true
  await request.put('/user/updatePwd', {
    old_pwd: password.value,
    new_pwd: newPassword.value,
    re_pwd: rePassword.value
  })
  isLoading.value = false
  userStore.token = ''
  await router.push('/user/login')
  window.location.reload()
}

// 图片上传
const headers = {
  Authorization: userStore.token
}

const handleAvatarSuccess = async (resp, uploadFile) => {
  isLoading.value = true
  let formData = new FormData()
  formData.append('file', uploadFile.raw)
  if (resp.data !== undefined) {
    formData = new FormData()
    formData.set('avatarUrl', resp.data)
    console.log(resp.data)
    try {
      await request.put('/user/updateAvatar', formData)
    } finally {
      isLoading.value = false
    }
    userStore.Avatar = resp.data
  }
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片必须是jpg或png格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片不能超过5MB!')
    return false
  }
  return true
}
// 引入定义的环境变量
const apiUrl = import.meta.env.VITE_API_URL
</script>

<template>
  <div class="common-layout" v-loading="isLoading">
    <el-container>
      <el-header style="text-align: center; margin-top: 10px">
        <el-upload
          :action="`${apiUrl}/common/upload`"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          class="avatar-uploader"
          :headers="headers"
        >
          <el-avatar :src="userStore.Avatar" id="step-1" />
        </el-upload>
        <el-text>{{ userStore.username }}</el-text>
      </el-header>
      <el-main style="text-align: center">
        <h3>
          你的权限是：
          <el-text
            :class="userInfo.roleName === '管理员' ? 'gradient-text-admin' : 'gradient-text'"
            >{{ userInfo.roleName }}</el-text
          >
        </h3>
        <br />
        <div class="box">
          <h2>修改密码</h2>
          <div class="input-box">
            <label>旧密码</label>
            <input v-model="password" type="password" />
          </div>
          <div class="input-box">
            <label>新密码</label>
            <input v-model="newPassword" type="password" />
          </div>
          <div class="input-box">
            <label>再次输入新密码</label>
            <input v-model="rePassword" type="password" @keyup.enter="updatePwd" />
          </div>
          <div class="btn-box" style="align-items: center">
            <div>
              <button @click="updatePwd" id="step-2">修改</button>
            </div>
          </div>
        </div>
        <br />
        <el-button id="step-3" type="primary" @click="userStore.Logout()">返回主页</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.gradient-text {
  font-size: 18px;
  font-weight: bold;
  background: -webkit-linear-gradient(15deg, #92fe9d, #00c9ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; /* 使文字颜色透明，显示背景渐变色 */
}

.gradient-text-admin {
  font-size: 18px;
  font-weight: bold;
  background: -webkit-linear-gradient(15deg, #fc0000, #ff00fb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; /* 使文字颜色透明，显示背景渐变色 */
}
</style>
