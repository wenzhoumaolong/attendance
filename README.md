# 考勤管理系统

## 技术栈
vue.js + egg.js + mysql

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

## 数据库
### 创建
* 在mysql中执行sql文件夹下面的init.sql脚本
* 创建数据库成功之后，执行mockData.sql, 插入测试数据

## TODO
* ~~环境搭建~~
* Login（用户名 + 密码）
* Logout
* 员工管理
* 角色管理(超级管理员，管理员，员工)
* 分配管理员
* 仓库管理
* 员工与标签代码绑定/解绑
* 查询打卡记录
* 接受存储进出门信号
* 微信与管理员绑定(扫码)
* 微信链接参数设置
* 删除历史数据
* ~~微信公众号申请~~
* 模板消息
    * ~~模板消息申请~~
    * 发送模板消息
*上次登录时间地点等

## 其他
1. 在development环境，为了方便开发，前后端都包含各自的server
  * 后端服务仅提供数据
  * 前端服务提供UI，并支持HMR
