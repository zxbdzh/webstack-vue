<script setup>
// 文本内容
defineProps({
  text: {
    required: true,
    type: String,
    default: '未分类'
  },
  id: {
    required: true,
    type: Number
  }
})
</script>

<template>
  <div :id="id">
    <el-icon><Notebook /></el-icon>
    <el-text>{{ text }}</el-text>
    <hr />
  </div>
</template>

<style scoped>
.el-icon {
  margin-right: 10px;
  font-size: 15px;
}
hr {
  margin-bottom: 10px;
}
</style>
