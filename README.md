# egg-vue

> egg.js + vue.js

## Note
1. 在development环境，为了方便开发，前后端都包含各自的server
  * 后端服务仅提供数据
  * 前端服务提供UI，并支持HMR

## Build

``` bash
# 安装依赖
npm install

# 生产环境
npm run build

# 开发环境
npm run dev:client
npm run dev:server
```

# 数据库创建
在mysql中执行sql文件夹下面的init.sql脚本
创建数据库成功之后，执行mockData.sql, 插入测试数据
