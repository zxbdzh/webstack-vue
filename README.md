# webstack-vue

使用vue3 + vite 构建的webstack项目，原项目：https://github.com/WebStackPage/WebStackPage.github.io

## 📖 介绍

根据原项目制作的网页导航，特点如下：
- 🌟 现代化界面：基于 Vue 3 + Element Plus 构建的现代化UI
- 📱 响应式设计：完美适配桌面端和移动端
- 🔖 书签管理：支持浏览器书签导入导出功能
- 📂 分类系统：书签进行分类管理，支持多级分类
- 🛠️ 后台系统：完整的管理员后台，支持标签、分类、用户管理
- 👥 用户系统：用户登录注册功能（持续完善中）
- 🎨 主题切换：支持暗黑模式和亮色模式切换
- 📖 用户引导：新用户首次使用引导功能

## 🚀 技术栈

### 前端框架
- **Vue 3** - 渐进式JavaScript框架
- **Vue Router 4** - 官方路由管理器
- **Pinia** - Vue状态管理库

### UI组件库
- **Element Plus** - Vue 3 UI组件库
- **Element Plus Icons** - 图标组件库

### 构建工具
- **Vite** - 下一代前端构建工具
- **Vue DevTools** - Vue开发者工具

### 工具库
- **Axios** - HTTP客户端
- **VueUse** - Vue组合式API工具集
- **Driver.js** - 用户引导库
- **Pinia Plugin Persistedstate** - Pinia持久化插件

### 开发工具
- **ESLint** - 代码质量检查工具
- **Prettier** - 代码格式化工具
- **unplugin-auto-import** - 自动导入插件
- **unplugin-vue-components** - 组件自动导入插件

## 📁 项目结构

```
webstack-vue/
├── public/                 # 静态资源
│   └── favicon.ico        # 网站图标
├── src/                   # 源代码
│   ├── assets/           # 资源文件
│   │   ├── css/          # 样式文件
│   │   ├── js/           # JavaScript文件
│   │   └── logo.svg      # Logo文件
│   ├── components/       # 公共组件
│   │   ├── form/         # 表单组件
│   │   ├── AdminSideBar.vue
│   │   ├── CardHeader.vue
│   │   ├── CardVue.vue
│   │   ├── CommonHeader.vue
│   │   ├── CommonUpload.vue
│   │   ├── SideBar.vue
│   │   └── ToggleDarkButton.vue
│   ├── router/           # 路由配置
│   │   └── index.js
│   ├── stores/           # 状态管理
│   │   └── user.js
│   ├── utils/            # 工具函数
│   │   └── request.js
│   ├── views/            # 页面组件
│   │   ├── Admin/        # 管理员页面
│   │   ├── User/         # 用户页面
│   │   └── HomeView.vue  # 首页
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── .env.development      # 开发环境配置
├── .env.production       # 生产环境配置
├── .eslintrc.cjs         # ESLint配置
├── .prettierrc.json      # Prettier配置
├── .gitignore           # Git忽略文件
├── index.html           # HTML模板
├── jsconfig.json        # JavaScript配置
├── package.json         # 项目依赖
├── pnpm-lock.yaml       # 锁定文件
├── vite.config.js       # Vite配置
└── README.md            # 项目文档
```

## 🛠️ 安装与使用

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0 (推荐) 或 npm >= 8.0.0

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/zxbdzh/webstack-vue.git
cd webstack-vue
```

2. **安装依赖**
```bash
# 使用pnpm (推荐)
pnpm install

# 或使用npm
npm install
```

3. **环境配置**

修改环境变量文件：
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

主要配置项：
```env
# 开发环境API地址
VITE_API_URL=http://localhost:3000/api

# 生产环境API地址
VITE_API_URL=https://your-api-domain.com/api

# 基础路径（可选）
VITE_BASE_API=/
```

4. **启动开发服务器**
```bash
pnpm dev
```

5. **构建生产版本**
```bash
pnpm build
```

6. **预览生产构建**
```bash
pnpm preview
```

### 后端API部署

项目需要配合后端API使用，请自行部署API服务：
- 后端项目地址：[webstack-backend](https://github.com/zxbdzh/webstack-backend)
- 按照后端项目的说明进行部署和配置

## 📋 项目相关指令

### 开发指令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

### 部署说明

#### Nginx部署示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/webstack-vue/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://your-backend-api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### OpenResty部署

OpenResty部署方式与Nginx类似，可以直接使用上述配置。

## 🌟 功能特性

### 主要功能

- **🏠 首页导航**：展示分类书签，支持折叠侧边栏
- **🔍 分类浏览**：按分类浏览书签，支持多级分类
- **👤 用户系统**：用户注册、登录、个人中心
- **🛠️ 管理后台**：
  - 标签管理：增删改查书签标签
  - 分类管理：管理书签分类结构
  - 用户管理：管理系统用户
  - 书签管理：批量管理书签数据

### 界面特性

- **📱 响应式设计**：自适应桌面端和移动端
- **🌙 暗黑模式**：支持亮色/暗色主题切换
- **✨ 动画效果**：流畅的页面过渡和交互动画
- **📖 用户引导**：新用户首次使用的功能介绍

### 技术特性

- **🚀 现代化构建**：基于Vite的快速开发和构建
- **💾 状态持久化**：用户数据和设置的本地存储
- **🔧 自动导入**：组件和API的自动导入优化开发体验
- **✅ 代码规范**：ESLint + Prettier保证代码质量

## 🔧 开发指南

### 添加新功能

1. 在 `src/views/` 中创建新页面组件
2. 在 `src/router/index.js` 中添加路由配置
3. 如需状态管理，在 `src/stores/` 中创建store
4. 在 `src/components/` 中创建可复用组件

### 样式规范

- 使用Element Plus主题系统
- 遵循BEM命名规范
- 响应式设计优先

### 代码规范

- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 遵循Vue 3 Composition API最佳实践

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [WebStackPage](https://github.com/WebStackPage/WebStackPage.github.io) - 原项目灵感来源
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Element Plus](https://element-plus.org/) - Vue 3 UI组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/zxbdzh/webstack-vue/issues)
- 发送邮件到：your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
