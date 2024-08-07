<script setup>
import { reactive, ref } from 'vue'
import request from '@/utils/request.js'
import CommonUpload from '@/components/CommonUpload.vue'

// 获取分类列表
const categoryList = ref([])
const getCategoryList = async () => {
  const data = (await request.get('/category')).data.data
  for (const d of data) {
    if (d.children.length > 0) {
      categoryList.value.push(...d.children)
    }
    categoryList.value.push(d)
  }
}
getCategoryList()

// 表单信息
const ruleFormRef = ref()
const form = ref({
  id: '',
  name: '',
  desc: '',
  url: '',
  categoryId: '',
  imgUrl: ''
})

const rules = reactive({
  name: [
    { required: true, message: '请输入标签名!', trigger: 'blur' },
    { max: 20, message: '标签名不能超过20个字!', trigger: 'blur' }
  ],
  categoryId: [
    {
      required: true,
      message: '请选择标签!',
      trigger: 'change'
    }
  ],
  desc: [
    {
      required: true,
      message: '请输入描述!',
      trigger: 'blur'
    },
    {
      max: 50,
      message: '最多可以输入50个字!',
      trigger: 'blur'
    }
  ],
  url: [
    {
      required: true,
      message: '请输入链接',
      trigger: 'blur'
    },
    { max: 50, message: '链接不能超过50个字!', trigger: 'blur' },
    {
      pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
      message: '请输入有效的链接',
      trigger: 'blur'
    }
  ],
  imgUrl: [
    {
      required: true,
      message: '请选择图片!',
      trigger: 'change'
    }
  ]
})

// 注册子传父事件
const emit = defineEmits(['AddDialogClose'])
// 提交表单
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      await request.put('/label', {
        id: form.value.id,
        name: form.value.name,
        categoryId: form.value.categoryId,
        description: form.value.desc,
        url: form.value.url,
        imgUrl: form.value.imgUrl
      })
      form.value.name = ''
      form.value.categoryId = ''
      form.value.desc = ''
      form.value.url = ''
      form.value.imgUrl = ''
      emit('AddDialogClose', false)
    }
  })
}

const resetForm = () => {
  // 给表单设置默认值
  form.value.name = ''
  form.value.categoryId = ''
  form.value.desc = ''
  form.value.url = ''
  form.value.imgUrl = ''
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
    <el-form-item label="标签名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="分类" prop="categoryId">
      <el-select v-model="form.categoryId" placeholder="选择父分类">
        <template v-for="item in categoryList" :key="item.id">
          <el-option :label="item.name" :value="item.id" />
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="描述" prop="desc">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="链接" prop="url">
      <el-input v-model="form.url" />
    </el-form-item>
    <el-form-item label="图片" prop="imgUrl">
      <common-upload :form="form" @update:form="form = $event"></common-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      <el-button type="warning" @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
