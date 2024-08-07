<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    String,
    default: '没有内容呢'
  },
  sub_title: {
    String,
    default: '没有内容呢'
  },
  imgUrl: {
    String,
    default: 'https://picgo.cn-sy1.rains3.com/2024/04/1c8ca48e6b4f4b88584a62a70c78d9db.jpg'
  },
  url: {
    String,
    required: true
  }
})

const goToExternalSite = (url) => {
  window.location.href = url // 替换为你要跳转的外部网址
}
</script>

<template>
  <el-tooltip class="box-item" :content="sub_title" placement="bottom">
    <el-card class="card" shadow="hover" @click="goToExternalSite(url)">
      <el-avatar fit="fill" :size="50" :src="imgUrl" lazy />
      <span>
        {{ title }}
      </span>
      <div class="bottom">
        <el-button text class="button">
          {{ sub_title }}
        </el-button>
      </div>
    </el-card>
  </el-tooltip>
</template>

<style scoped></style>
