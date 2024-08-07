<script setup>
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { defineProps, ref } from 'vue'

defineProps({
  isMobileWidth: {
    required: true,
    type: Boolean
  }
})
// 点击切换折叠按钮
const emit = defineEmits(['update-collapse'])
const isCollapse = ref(false)
const clickCollapse = () => {
  isCollapse.value = !isCollapse.value
  emit('update-collapse', isCollapse.value)
}
</script>

<template>
  <el-menu :collapse="isMobileWidth || isCollapse" class="el-menu-vertical-demo" default-active="2">
    <!--      切换折叠按钮          -->
    <el-icon @click="clickCollapse" v-if="!isMobileWidth" id="collapse-button"
      ><DArrowLeft v-if="!isCollapse" />
      <DArrowRight v-else></DArrowRight>
    </el-icon>
    <el-image
      src="https://picgo.cn-sy1.rains3.com/2024/06/400aeee04c10937e93f02291997e93c7.jpg"
    ></el-image>
    <router-link to="/admin/tag">
      <el-menu-item index="1-1">
        <el-icon><PriceTag /></el-icon>
        <template #title>标签管理</template>
      </el-menu-item>
    </router-link>
    <router-link to="/admin/category">
      <el-menu-item index="1-2">
        <el-icon><Files /></el-icon>
        <template #title>分类管理</template>
      </el-menu-item>
    </router-link>
    <router-link to="/admin/bookmark">
      <el-menu-item index="1-3">
        <el-icon><ChromeFilled /></el-icon>
        <template #title>书签导入导出</template>
      </el-menu-item>
    </router-link>
    <router-link to="/">
      <el-menu-item index="1-4">
        <el-icon><HomeFilled /></el-icon>
        <template #title>主页</template>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<style scoped>
#collapse-button {
  font-size: 21px;
  color: #66ccff;
}

#collapse-button:hover {
  cursor: pointer;
  display: inline-block;

  animation: fadeIn;
  animation-duration: 0.5s;
}
</style>
