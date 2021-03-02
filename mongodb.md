## 1、下载、安装
安装D盘
[安装方法和中文文档](https://www.runoob.com/mongodb/mongodb-window-install.html)
[下载链接](https://www.mongodb.com/try/download/community)


## cmd 中 操作数据库

[更多操作](https://www.runoob.com/mongodb/mongodb-window-install.html)

### 连接

`mongo`
### 查看数据库列表

`show dbs`
### 查看当前数据库

`db`
### 切换数据库

`use dbName`

### 查看集合(数组)
`show collections`

### 新增数据(对象)

`db.students.insertOne(插入的数据对象)`
### 查询所有数据

`db.students.find()`


## node 中 操作数据库

[原生 node-mongodb 包](https://github.com/mongodb/node-mongodb-native)

> 本后台使用第三方包操作mongodb数据库

[第三方 node-mongodb 包](http://www.mongoosejs.net/docs/connections.html)