# RuoYi v3.8.7

## 基线

原始仓库: https://github.com/yangzongzhuan/RuoYi-Vue3

当前基于Commit: 49d0fc0

## 后端

[RuoYi-SpringBoot](https://github.com/XFY9326/RuoYi-SpringBoot)

## 修改内容

- 去除无用界面
- 全部依赖升级
- 增加prettier格式化代码
- 补充表单构建模块
- 使用pnpm代替npm
- 增加部分代码补全功能

## 前端运行

```bash
# 进入项目目录
cd RuoYi-Vue3

# 安装pnpm
npm install -g pnpm

# 安装依赖
pnpm install

# 启动服务
pnpm dev

# 构建测试环境 pnpm build:stage
# 构建生产环境 pnpm build:prod
# 前端访问地址 http://localhost:8081
```

## 默认账户

- 用户名：admin
- 密码：admin123
