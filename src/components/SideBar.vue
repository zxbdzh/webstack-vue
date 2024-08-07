<script setup>
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { defineProps, ref } from 'vue'

const scrollToSection = (id) => {
  const targetElement = document.getElementById(id)
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' })
  }
}

defineProps({
  isMobileWidth: {
    required: true,
    type: Boolean
  },
  menuList: {
    required: true,
    type: Array
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
    <el-icon v-if="!isMobileWidth" id="collapse-button" @click="clickCollapse">
      <DArrowLeft v-if="!isCollapse" />
      <DArrowRight v-else></DArrowRight>
    </el-icon>
    <el-image
      src="https://picgo.cn-sy1.rains3.com/2024/06/400aeee04c10937e93f02291997e93c7.jpg"
    ></el-image>
    <template v-for="item in menuList" :key="item.id">
      <el-sub-menu v-if="item.children.length !== 0">
        <template #title>
          <el-icon :index="item.id">
            <location />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group v-for="i in item.children" :key="i.id">
          <el-menu-item :index="item.id + '-' + i.id" @click="scrollToSection(i.id)"
            >{{ i.name }}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item v-else :index="item.id" @click="scrollToSection(item.id)">
        <el-icon>
          <Collection />
        </el-icon>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </template>

    <el-menu-item index="-1" @click="$router.push('/admin')">
      <el-icon id="step-6">
        <setting />
      </el-icon>
      <template #title>设置</template>
    </el-menu-item>
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

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
