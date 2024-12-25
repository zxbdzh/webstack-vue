<script setup>
import request from '@/utils/request.js'
import { ref, computed, onMounted } from 'vue'
import EditForm from '@/components/form/EditForm.vue'
import AddForm from '@/components/form/AddForm.vue'

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
  tableData.value = []
  imgList.value = []
  loading.value = true
  pageData.value = (await request.get('/label/page', { page, size })).data.data
  tableData.value = pageData.value.records
  for (const data of tableData.value) {
    imgList.value.push(data.imgUrl)
  }
  currentPage.value = pageData.value.current
  pageSize.value = pageData.value.size
  total.value = pageData.value.total
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
const removeLabel = (id) => {
  ElMessageBox.confirm('你确定要删除这个标签吗？', 'Warning', {
    confirmButtonText: '是',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  })
    .then(async () => {
      await request.delete('/label/' + id)
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
// 编辑表单相关内容
const editForm = ref({
  id: '',
  name: '',
  desc: '',
  url: '',
  imgUrl: '',
  category: '',
  categoryName: ''
})
// 控制子组件的显示
const showChild = ref(false)
const openDialog = async (id, name, desc, url, imgUrl, categoryId) => {
  editForm.value.id = ''
  editForm.value.name = ''
  editForm.value.desc = ''
  editForm.value.url = ''
  editForm.value.imgUrl = ''
  editForm.value.categoryName = ''

  loading.value = true
  const categoryList = (await request.get(`/category/name/${categoryId}`)).data.data
  for (const category of categoryList) {
    editForm.value.categoryName = category.name
  }
  loading.value = false
  editForm.value.id = id
  editForm.value.name = name
  editForm.value.desc = desc
  editForm.value.url = url
  editForm.value.imgUrl = imgUrl
  centerDialogVisible.value = true
  showChild.value = true
}

// 接受子事件关闭弹层
const handleDialogClose = (status) => {
  centerDialogVisible.value = status
  ElMessage({
    type: 'success',
    message: '修改成功'
  })

  editForm.value.id = ''
  editForm.value.name = ''
  editForm.value.desc = ''
  editForm.value.url = ''
  editForm.value.imgUrl = ''
  editForm.value.categoryName = ''
  getTableData()
}

// 动态搜索内容
const search = ref('')
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      search.value === data.id.toString() ||
      data.description.toLowerCase().includes(search.value.toLowerCase()) ||
      data.url.toLowerCase().includes(search.value.toLowerCase())
  )
)

// 新增标签
const AddDialogVisible = ref(false)

// 接受子事件关闭弹层
const handleAddDialogClose = (status) => {
  AddDialogVisible.value = status
  ElMessage({
    type: 'success',
    message: '添加成功'
  })
  editForm.value.id = ''
  editForm.value.name = ''
  editForm.value.desc = ''
  editForm.value.url = ''
  editForm.value.imgUrl = ''
  editForm.value.categoryName = ''
  getTableData()
}
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
    <edit-form
      v-if="showChild"
      :name="editForm.name"
      :desc="editForm.desc"
      :img-url="editForm.imgUrl"
      :url="editForm.url"
      :category-name="editForm.categoryName"
      :id="editForm.id"
      @DialogClose="handleDialogClose"
    ></edit-form>
  </el-dialog>
  <!--  编辑弹层      -->
  <el-dialog
    v-model="AddDialogVisible"
    title="添加菜单"
    width="500"
    align-center
    @close="showChild = false"
  >
    <AddForm @AddDialogClose="handleAddDialogClose"></AddForm>
  </el-dialog>
  <div style="display: flex; justify-content: flex-end; margin-bottom: 15px">
    <el-button type="success" size="large" @click="AddDialogVisible = true">新增标签</el-button>
  </div>
  <!--表格-->
  <el-table
    :data="filterTableData"
    :default-sort="{ prop: 'id', order: 'ascending' }"
    style="width: 100%"
    v-loading="loading"
    stripe
  >
    <el-table-column prop="id" label="id" sortable />
    <el-table-column prop="name" label="标签名" />
    <el-table-column prop="description" label="描述" />
    <el-table-column prop="url" label="链接">
      <template #default="{ row }">
        <a :href="row.url">{{ row.url }}</a>
      </template>
    </el-table-column>
    <el-table-column prop="imgUrl" label="图片链接">
      <template #default="{ row }">
        <el-image :src="row.imgUrl" style="width: 100px; height: 100px" />
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
        <el-button
          @click="
            openDialog(row.id, row.name, row.description, row.url, row.imgUrl, row.categoryId)
          "
          :type="'primary'"
          >编辑
        </el-button>

        <el-button :type="'danger'" @click="removeLabel(row.id)">删除</el-button>
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
