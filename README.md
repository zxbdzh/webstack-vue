# webstack-vue

使用vue3 + vite 构建的webstack项目，原项目：https://github.com/WebStackPage/WebStackPage.github.io

## 介绍

根据原项目制作的网页导航，特点如下：
- 支持浏览器书签导入导出
- 书签进行分类
- 后台系统
- 用户系统（未完善）

## 使用教程

1. 自行部署api：[webstack-backend](https://github.com/zxbdzh/webstack-backend)
2. clone项目
```bash
git clone https://github.com/zxbdzh/webstack-vue.git
```
3. 修改.env.xxx
- `.env.development`的 VITE_API_URL：开发环境，运行dev时的API地址
- `.env.production`的 VITE_API_URL：生产环境，运行build时的API地址
4. 运行build打包
```bash
pnpm run build
```
5. 部署
nginx 或 openresty 均可

## 项目相关指令

### 调试项目

```sh
pnpm dev
```

### 打包项目

```sh
pnpm build
```


