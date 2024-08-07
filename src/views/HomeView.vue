<script setup>
import SideBar from '@/components/SideBar.vue'
import { onMounted, onUnmounted, ref, watch, reactive } from 'vue'
import('@/components/CardVue.vue')
import 'animate.css'
import CommonHeader from '@/components/CommonHeader.vue'
import CardHeader from '@/components/CardHeader.vue'
import '@/utils/request.js'
import request from '@/utils/request.js'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()

// 检测页面宽度是否为手机屏幕宽度
const isMobileWidth = ref(window.innerWidth <= 480) // 假设手机屏幕宽度最大为 480px

const checkScreenWidth = () => {
  isMobileWidth.value = window.innerWidth <= 480
}

// 获取页面数据
let label_data = reactive([])
let category_data = reactive([])
const getData = async () => {
  console.log(import.meta.env)
  isLoading.value = true
  let data = (await request.get('/label')).data.data
  label_data.push(...data)
  data = (await request.get('/category')).data.data
  category_data.push(...data)
  isLoading.value = false
  // 引导
  if (!userStore.AlreadyGuide) {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#UserAvatar',
          popover: {
            title: '用户引导',
            description: '通过此处打开个人中心和退出登录操作',
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '.el-main',
          popover: {
            title: '用户引导',
            description: '此处卡片展示网页导航',
            side: 'top',
            align: 'start'
          }
        },
        {
          element: '.el-menu',
          popover: {
            title: '用户引导',
            description: '此处是所有导航分类',
            side: 'top',
            align: 'start'
          }
        },
        {
          element: 'ul.el-menu > li',
          popover: {
            title: '用户引导',
            description: '点击导航分类，可以跳转到对于分类位置',
            side: 'top',
            align: 'start'
          }
        },
        {
          element: '#collapse-button',
          popover: {
            title: '用户引导',
            description: '点击此处可以折叠分类栏',
            side: 'top',
            align: 'start'
          }
        },
        {
          element: '#step-6',
          popover: {
            title: '用户引导',
            description: '此处是管理面板入口，需要登录管理员账户',
            side: 'top',
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
    userStore.AlreadyGuide = true
  }
}

onMounted(() => {
  getData()
  checkScreenWidth() // 初始检测
  window.addEventListener('resize', checkScreenWidth) // 监听窗口大小变化
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth) // 组件卸载时移除事件监听
})

// 点击切换折叠按钮
const isCollapse = ref(false)
const CollapseChange = (collapse) => {
  isCollapse.value = collapse
}
const myWidth = ref('300px')
// 使用 watch API 来监听 isCollapse 的变化
watch(isCollapse, (newVal) => {
  // 在这里添加你想在 isCollapse 变化时执行的逻辑
  if (newVal === true) myWidth.value = '60px'
  else myWidth.value = '300px'
})

// 加载
const isLoading = ref(true)
</script>

<template>
  <div class="common-layout" v-loading="isLoading">
    <el-container>
      <el-aside :width="isMobileWidth ? '64px' : myWidth" v-if="!isMobileWidth">
        <el-scrollbar :style="`position: fixed; width: ${myWidth === '60px' ? '5%' : '15%'} `">
          <side-bar
            :isMobileWidth="isMobileWidth"
            @update-collapse="CollapseChange"
            :menu-list="category_data"
          ></side-bar>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>
          <common-header :checkScreenWidth="checkScreenWidth"></common-header>
        </el-header>
        <el-main>
          <template v-for="item in category_data" :key="item.id">
            <CardHeader :span="24" :text="item.name" :id="item.id"></CardHeader>
            <template v-for="child in item.children" :key="child.id">
              <CardHeader :span="24" :text="child.name" :id="child.id"></CardHeader>
              <div class="card-container" v-if="!isMobileWidth" style="margin-bottom: 20px">
                <template v-for="label in label_data" :key="label.id">
                  <CardVue
                    v-if="child.id === label.categoryId"
                    :img-url="label.imgUrl"
                    :title="label.name"
                    :sub_title="label.description"
                    :url="label.url"
                  ></CardVue>
                </template>
              </div>
              <div
                class="card-container-mobile"
                v-else
                v-loading="isLoading"
                style="margin-bottom: 20px"
              >
                <template v-for="label in label_data" :key="label.id">
                  <CardVue
                    v-if="child.id === label.categoryId"
                    :img-url="label.imgUrl"
                    :title="label.name"
                    :sub_title="label.description"
                    :url="label.url"
                  ></CardVue>
                </template>
              </div>
            </template>
            <div
              class="card-container"
              v-if="!isMobileWidth"
              v-loading="isLoading"
              style="margin-bottom: 20px"
            >
              <template v-for="label in label_data" :key="label.id">
                <CardVue
                  v-if="item.id === label.categoryId"
                  :img-url="label.imgUrl"
                  :title="label.name"
                  :sub_title="label.description"
                  :url="label.url"
                ></CardVue>
              </template>
            </div>
            <div
              class="card-container-mobile"
              v-else
              v-loading="isLoading"
              style="margin-bottom: 20px"
            >
              <template v-for="label in label_data" :key="label.id">
                <CardVue
                  v-if="item.id === label.categoryId"
                  :img-url="label.imgUrl"
                  :title="label.name"
                  :sub_title="label.description"
                  :url="label.url"
                ></CardVue>
              </template>
            </div>
          </template>
        </el-main>
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
