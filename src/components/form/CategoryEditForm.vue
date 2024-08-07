<script setup>
import { defineProps, reactive, ref } from 'vue'
import request from '@/utils/request.js'

// 表单信息
const ruleFormRef = ref()
const data = defineProps({
  id: {
    Number,
    required: true
  },
  name: {
    String,
    required: true
  },
  fatherId: {
    String,
    required: true
  },
  fatherName: {
    String,
    required: true
  }
})

// 获取分类列表
const categoryList = ref([])
const getCategoryList = async () => {
  const category = (await request.get('/category')).data.data
  for (const d of category) {
    if (d.children.length > 0) {
      for (const c of d.children)
        if (data.id !== c.id && c.fatherId === 0) categoryList.value.push(c)
    }
    if (data.id !== d.id && d.fatherId === 0) categoryList.value.push(d)
  }
}
getCategoryList()

const form = ref({
  id: '',
  name: '',
  fatherId: ''
})

const rules = reactive({
  name: [
    { required: true, message: '请输入标签名!', trigger: 'blur' },
    { max: 20, message: '标签名不能超过20个字!', trigger: 'blur' }
  ],
  fatherId: [
    {
      required: false
    }
  ]
})

// 注册子传父事件
const emit = defineEmits(['DialogClose'])
// 提交表单
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      await request.post('/category', {
        id: form.value.id,
        name: form.value.name,
        fatherId: form.value.fatherId === '' ? null : form.value.fatherId
      })
      emit('DialogClose', false)
    }
  })
}

const resetForm = () => {
  // 给表单设置默认值
  form.value.id = ''
  form.value.name = ''
  form.value.fatherId = ''
}

form.value.id = data.id
form.value.name = data.name
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
    <el-form-item label="分类" prop="fatherId">
      <el-select
        v-model="form.fatherId"
        :placeholder="data.fatherName !== '' ? data.fatherName : '请选择父分类'"
      >
        <template v-for="item in categoryList" :key="item.id">
          <el-option :label="item.name" :value="item.id" />
        </template>
        <el-option label="无父类" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      <el-button type="warning" @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
