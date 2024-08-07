<script setup>
import CommonHeader from '@/components/CommonHeader.vue'
import { ref, onMounted, watch } from 'vue'
import AdminSideBar from '@/components/AdminSideBar.vue'

// 检测页面宽度是否为手机屏幕宽度
const isMobileWidth = ref(window.innerWidth <= 480) // 假设手机屏幕宽度最大为 480px

const checkScreenWidth = () => {
  isMobileWidth.value = window.innerWidth <= 480
}

// 点击切换折叠按钮
const isCollapse = ref(false)
const CollapseChange = (collapse) => {
  isCollapse.value = collapse
}
const myWidth = ref('200px')
// 使用 watch API 来监听 isCollapse 的变化
watch(isCollapse, (newVal) => {
  // 在这里添加你想在 isCollapse 变化时执行的逻辑
  if (newVal === true) myWidth.value = '60px'
  else myWidth.value = '200px'
})

onMounted(() => {
  checkScreenWidth() // 初始检测
  window.addEventListener('resize', checkScreenWidth) // 监听窗口大小变化
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside :width="isMobileWidth ? '64px' : myWidth" v-if="!isMobileWidth">
          <el-scrollbar :style="`position: fixed; width: ${myWidth === '60px' ? '5%' : '15%'} `">
            <AdminSideBar :isMobileWidth @update-collapse="CollapseChange"></AdminSideBar>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-header>
            <common-header :checkScreenWidth="checkScreenWidth"></common-header>
          </el-header>
          <el-main><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-aside {
  height: 100vh;
  overflow-y: auto; /* 如果内容超出高度，允许滚动 */
}
</style>
