<script setup>
import request from '@/utils/request.js'
import { useUserStore } from '@/stores/user.js'

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:form'])

const headers = {
  Authorization: useUserStore().token
}

const handleAvatarSuccess = async (resp, uploadFile) => {
  const formData = new FormData()
  formData.set('file', uploadFile.raw)

  const newImgUrl = resp.data

  // 通知父组件更新，而不是直接修改props
  emit('update:form', { ...props.form, imgUrl: newImgUrl })
}
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片必须是jpg或png格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片不能超过5MB!')
    return false
  }
  return true
}

// 引入定义的环境变量
const apiUrl = import.meta.env.VITE_API_URL
</script>

<template>
  <el-upload
    :action="`${apiUrl}/common/upload`"
    :before-upload="beforeAvatarUpload"
    :on-success="handleAvatarSuccess"
    :show-file-list="false"
    class="avatar-uploader"
    :headers="headers"
  >
    <el-image
      v-if="form.imgUrl"
      :src="form.imgUrl"
      class="avatar"
      fit="cover"
      style="height: 100px; width: 100px"
    />
    <el-icon v-else class="avatar-uploader-icon" style="width: 100px; height: 100px">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<style scoped></style>
