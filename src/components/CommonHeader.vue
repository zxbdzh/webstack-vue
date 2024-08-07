<script setup>
import ToggleDarkButton from '@/components/ToggleDarkButton.vue'
import { onMounted } from 'vue'
import request from '@/utils/request.js'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'

const userStore = useUserStore()

defineProps({
  checkScreenWidth: {
    required: true,
    default: true
  }
})
onMounted(() => {
  request
    // .get('/one')
    .get('https://v1.hitokoto.cn')
    .then(({ data }) => {
      const hitokoto = document.querySelector('#hitokoto_text')
      // hitokoto.href = `/one/?uuid=${data.uuid}`
      hitokoto.href = `https://v1.hitokoto.cn/?uuid=${data.uuid}`
      hitokoto.innerText = data.hitokoto
    })
    .catch(console.error)
})

// 用户登出
const LogOut = async () => {
  userStore.token = ''
  await router.push('/')
  window.location.reload()
}

// 跳转用户中心
const Login = async () => {
  if (userStore.token !== '') {
    await router.push('/user/console')
    window.location.reload()
  } else {
    await router.push('/user/login')
    window.location.reload()
  }
}
</script>

<template>
  <el-row :gutter="20" justify="space-between" style="align-items: center; margin-top: 10px">
    <el-col :span="16">
      <!--       一言标语         -->
      <el-text
        line-clamp="2"
        class="hitokoto"
        v-loading="oneloading"
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(122, 122, 122, 0.8)"
      >
        <a href="#" id="hitokoto_text"></a>
      </el-text>
      <p id="hitokoto"></p>
    </el-col>
    <!--     切换模式         -->
    <el-col :span="1">
      <ToggleDarkButton :size="checkScreenWidth ? '1' : '0.5'"></ToggleDarkButton>
    </el-col>
    <el-col :span="2">
      <el-dropdown id="UserAvatar">
        <div style="text-align: center">
          <el-avatar :src="userStore.Avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="Login">用户中心</el-dropdown-item>
            <el-dropdown-item @click="LogOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-text {
  a {
    text-decoration: none;
    color: var(--el-text-color);
    font-size: 16px;
  }
  text-align: right;
}

.el-text:hover {
  display: inline-block;

  animation: jello;
  animation-duration: 0.5s;
}
</style>
