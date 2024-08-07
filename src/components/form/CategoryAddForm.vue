<script setup>
import { defineProps, reactive, ref } from 'vue'
import request from '@/utils/request.js'

// 表单信息
const ruleFormRef = ref()
const form = ref({
  id: '',
  name: ''
})

const rules = reactive({
  name: [
    { required: true, message: '请输入标签名!', trigger: 'blur' },
    { max: 20, message: '标签名不能超过20个字!', trigger: 'blur' }
  ]
})

// 注册子传父事件
const emit = defineEmits(['AddDialogClose'])
// 提交表单
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      await request.put('/category', {
        id: form.value.id,
        name: form.value.name
      })
      form.value.id = ''
      form.value.name = ''
      emit('AddDialogClose', false)
    }
  })
}

const resetForm = () => {
  // 给表单设置默认值
  form.value.id = ''
  form.value.name = ''
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="auto"
    status-icon
    style="max-width: 600px"
  >
    <el-form-item label="分类名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      <el-button type="warning" @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
