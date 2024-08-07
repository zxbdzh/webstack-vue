<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import '@/assets/js/dayAndNight.js'

// 白天黑夜切换按钮
const isDark = useDark()
const toggleDark = useToggle(isDark)
// 判断html是否有class属性dark
const htmlDark = ref(document.documentElement.classList.contains('dark'))
const size = ref(1)
</script>

<template>
  <theme-button
    @click="toggleDark()"
    :value="htmlDark ? 'dark' : 'light'"
    id="btn"
    :size="size"
  ></theme-button>
</template>

<style scoped></style>
