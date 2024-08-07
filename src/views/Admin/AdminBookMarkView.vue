<script setup>
import { ref } from 'vue'
import request from '@/utils/request.js'
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'text/html') {
    ElMessage.error('文件必须是html!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文件不能超过2MB!')
    return false
  }
  return true
}
const loading = ref(false)
const getExport = async () => {
  loading.value = true
  request
    .get('/common/bookmark/export')
    .then((response) => {
      // 创建一个Blob URL，指向下载的文件内容
      const url = window.URL.createObjectURL(new Blob([response.data]))
      // 创建一个临时的a标签用于下载
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'bookmark.html') // 设置下载的文件名
      document.body.appendChild(link)
      link.click() // 模拟点击开始下载
      document.body.removeChild(link) // 下载完成后移除临时链接
      window.URL.revokeObjectURL(url) // 释放Blob URL
    })
    .catch((error) => {
      console.error('Download error:', error)
    })
  loading.value = false
}

// 引入定义的环境变量
const apiUrl = import.meta.env.VITE_API_URL
</script>

<template>
  <div v-loading="loading">
    <h1>书签导入</h1>
    <hr />
    <br />
    <el-upload
      class="upload-demo"
      drag
      :action="`${apiUrl}/common/bookmark/upload`"
      name="file"
      accept="html"
      limit="1"
      :before-upload="beforeAvatarUpload"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">请将文件拖拽至此或 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">html 要小于 2MB</div>
      </template>
    </el-upload>
    <h1>书签导出</h1>
    <hr />
    <br />
    <el-button type="primary" @click="getExport">点击获取</el-button>
    <br />
    <br />
    <h1>如何使用导出书签到本网站？</h1>
    <hr />
    <br />
    <div class="content issue-description markdown-body">
      <h3>
        <a
          id="google-chrome-谷歌浏览器"
          class="anchor"
          href="#google-chrome-%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8"
        ></a
        >Google Chrome (谷歌浏览器)
      </h3>
      <ol>
        <li>
          按快捷键<code>Ctrl + Shift + O</code
          >打开Chrome书签管理器（或者地址栏输入<code>chrome://bookmarks/</code>）
        </li>
        <li>点击右上方三个点的按钮 &gt; 导出书签 &gt; 保存</li>
        <li>后台 &gt; 书签导出导入 &gt; 上传刚导出的html文件</li>
      </ol>
      <h3>
        <a
          id="360极速浏览器"
          class="anchor"
          href="#360%E6%9E%81%E9%80%9F%E6%B5%8F%E8%A7%88%E5%99%A8"
        ></a
        >360极速浏览器
      </h3>
      <ol>
        <li>
          按快捷键<code>Ctrl + Shift + O</code
          >打开Chrome书签管理器（或者地址栏输入<code>chrome://bookmarks/</code>）
        </li>
        <li>点击右上方导出导入 &gt; 导出收藏夹 &gt; 保存</li>
        <li>后台 &gt; 书签导出导入 &gt; 上传刚导出的html文件</li>
      </ol>
      <h3>
        <a
          id="firefox-火狐浏览器"
          class="anchor"
          href="#firefox-%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8"
        ></a
        >Firefox (火狐浏览器)
      </h3>
      <ol>
        <li>
          输入快捷键<code>Ctrl + Shift + B</code>打开我的足迹 &gt; 选择所有书签 &gt; 导出书签到HTML
          &gt; 保存
        </li>
        <li>后台 &gt; 书签导出导入 &gt; 上传刚导出的html文件</li>
      </ol>
      <h3><a id="microsoft-edge" class="anchor" href="#microsoft-edge"></a>Microsoft Edge</h3>
      <ol>
        <li>
          在浏览器标签页输入<code>edge://favorites/</code> &gt; 点击右上方三个点 &gt; 导出收藏夹
          &gt; 保存
        </li>
        <li>后台 &gt; 书签导出导入 &gt; 上传刚导出的html文件</li>
      </ol>
      <h2>
        <a id="补充说明" class="anchor" href="#%E8%A1%A5%E5%85%85%E8%AF%B4%E6%98%8E"></a>补充说明
      </h2>
      <ul>
        <li>Chrome/Firefox/Edge测试通过，理论上支持所有chromium内核浏览器，具体请自行测试，</li>
        <li>不保障所有浏览器书签均能导入成功，导入前请将数据库进行备份。</li>
      </ul>
      <h2>
        <a
          id="为什么会导入失败"
          class="anchor"
          href="#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E5%AF%BC%E5%85%A5%E5%A4%B1%E8%B4%A5"
        ></a
        >为什么会导入失败？
      </h2>
      <ol>
        <li>书签已经存在与数据库中</li>
        <li>书签标题为空字符</li>
        <li>书签链接为空字符</li>
      </ol>
    </div>
  </div>
</template>

<style scoped></style>
