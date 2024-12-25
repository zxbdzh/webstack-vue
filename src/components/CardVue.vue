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

<style scoped>
.effect-card {
  position: relative;
  width: 190px;
  height: 254px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 12px;
  gap: 12px;
  border-radius: 8px;
  cursor: pointer;
}

.effect-card::before {
  content: '';
  position: absolute;
  inset: 0;
  left: -5px;
  margin: auto;
  width: 200px;
  height: 264px;
  border-radius: 10px;
  background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
  z-index: -10;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.effect-card::after {
  content: '';
  z-index: -1;
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
  transform: translate3d(0, 0, 0) scale(0.95);
  filter: blur(20px);
}

.heading {
  font-size: 20px;
  text-transform: capitalize;
  font-weight: 700;
}

.effect-card p:not(.heading) {
  font-size: 14px;
}

.effect-card p:last-child {
  color: #e81cff;
  font-weight: 600;
}

.effect-card:hover::after {
  filter: blur(30px);
}

.effect-card:hover::before {
  transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
}
</style>
