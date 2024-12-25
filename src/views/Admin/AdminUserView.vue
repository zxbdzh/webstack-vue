<script setup>
import request from '@/utils/request.js'
import { ref, computed, reactive } from 'vue'
import CommonUpload from '@/components/CommonUpload.vue'

// 获取表格数据
// 使用 ref 来创建响应式数组
const tableData = ref([])
const imgList = ref([])
const pageData = ref(null)

// 分页
const currentPage = ref(0)
// 每页显示条目个数
const pageSize = ref(15)
// 总个数
const total = ref(0)
// 分页事件
const handleSizeChange = (val) => {
  getTableData(currentPage.value, val)
}
const handleCurrentChange = (val) => {
  getTableData(val, pageSize.value)
}
const getTableData = async (page = 1, size = 10) => {
  loading.value = true
  tableData.value = (await request.get('/user/page', { page, size })).data.data
  currentPage.value = tableData.value.current
  pageSize.value = tableData.value.size
  total.value = tableData.value.total
  loading.value = false
}

// 格式化日期
const DateFormat = (dateString) => {
  const date = new Date(dateString)

  const datePart = date.toLocaleDateString('zh-GB') // 格式化为 YYYY/MM/DD
  const timePart = date.toLocaleTimeString('en-GB') // 格式化为 HH:MM:SS

  return `${datePart} ${timePart}`
}

// 开启加载
let loading = ref(true)
getTableData()

// 按钮操作逻辑
// 删除标签
const removeUser = (id) => {
  ElMessageBox.confirm('你确定要删除这个标签吗？', 'Warning', {
    confirmButtonText: '是',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  })
    .then(async () => {
      await request.delete('/user/' + id)
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      await getTableData()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消'
      })
    })
}
// 编辑
const centerDialogVisible = ref(false)
const ruleFormRef = ref()
// 编辑表单相关内容
const form = ref({
  id: '',
  username: '',
  avatar: '',
  roleName: ''
})
// 职称列表
let roleList = ref([])
// 控制子组件的显示
const showChild = ref(false)
const openDialog = async (id, username, avatar, role) => {
  form.value.id = ''
  form.value.username = ''
  form.value.imgUrl = ''
  form.value.role = ''

  form.value.id = id
  form.value.username = username
  form.value.imgUrl = avatar
  form.value.role = role
  loading.value = true
  await request.get('/user/role/list').then((res) => {
    roleList.value = res.data.data
  })
  loading.value = false
  centerDialogVisible.value = true
  showChild.value = true
}

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名!', trigger: 'blur' },
    { max: 20, message: '标签名不能超过20个字!', trigger: 'blur' }
  ],
  role: [
    {
      required: true,
      message: '请选择职称!',
      trigger: 'change'
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

// 动态搜索内容
const search = ref('')
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase()) ||
      search.value === data.id.toString() ||
      data.role.toLowerCase().includes(search.value.toLowerCase())
  )
)

// 重置表单
const resetForm = () => {
  // 给表单设置默认值
  form.value.id = ''
  form.value.username = ''
  form.value.imgUrl = ''
  form.value.role = ''
}

// 提交表单
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      await request.put('/user/update', {
        id: form.value.id,
        username: form.value.username,
        role: form.value.role,
        avatar: form.value.imgUrl
      })
      loading.value = false
      resetForm()
      centerDialogVisible.value = false
      await getTableData()
    }
  })
}

// 新增标签
const AddDialogVisible = ref(false)
</script>

<template>
  <!--  编辑弹层      -->
  <el-dialog
    v-model="centerDialogVisible"
    title="修改菜单"
    width="500"
    align-center
    @close="showChild = false"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="auto"
      status-icon
      style="max-width: 600px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="职称" prop="role">
        <el-select v-model="form.role" placeholder="选择职称">
          <template v-for="item in roleList" :key="item.id">
            <el-option :label="item.roleName" :value="item.id" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="头像" prop="">
        <common-upload :form="form" @update:form="form = $event"></common-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button type="warning" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!--表格-->
  <el-table
    :data="filterTableData"
    :default-sort="{ prop: 'id', order: 'ascending' }"
    style="width: 100%"
    v-loading="loading"
    stripe
  >
    <el-table-column prop="id" label="id" sortable />
    <el-table-column prop="username" label="用户名" />
    <el-table-column prop="roleName" label="职称" />
    <el-table-column prop="avatar" label="头像">
      <template #default="{ row }">
        <el-image :src="row.avatar" style="width: 100px; height: 100px" />
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" sortable width="180">
      <template #default="{ row }">
        <el-text>{{ DateFormat(row.createTime) }}</el-text>
      </template>
    </el-table-column>

    <el-table-column prop="updateTime" label="上次更新时间" sortable width="180">
      <template #default="{ row }">
        <el-text>{{ DateFormat(row.updateTime) }}</el-text>
      </template>
    </el-table-column>

    <el-table-column width="180">
      <template #header>
        <el-input v-model="search" size="small" placeholder="type to search" />
      </template>
      <template #default="{ row }">
        <el-button @click="openDialog(row.id, row.username, row.avatar, row.role)" :type="'primary'"
          >编辑
        </el-button>

        <el-button :type="'danger'" @click="removeUser(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped></style>
