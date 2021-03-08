let express = require('express')
let fs = require('fs')
let path = require('path')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let { json } = require('express')
let routes = require('./routes');

let app = express()
let dbConfig = 'mongodb://localhost/test'
mongoose.connect(dbConfig)
let db = mongoose.connection;

db.once('open', () => {
  console.log('数据库链接成功');
})

// 遍历模型文件夹，统一引入
let models_path = path.join(__dirname, '/model')
let walk = (models_path) => {
  fs.readdirSync(models_path).forEach((file) => {
    var filePath = path.join(models_path, '/' + file)
    var stat = fs.statSync(filePath)

    if (stat.isFile()) {//判断是否文件
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(filePath)
      }
    } else if (stat.isDirectory()) {//判断是否文件夹
      walk(filePath)
    }
  })
}
walk(models_path)

// 解析所有的post请求 bodyParser 可处理以下四种数据
app.use(bodyParser.json({ limit: '50mb' }))   // json数据
app.use(bodyParser.json({ extends: true, limit: '50mb' }))   // UTF-8的编码的数据
// bodyParser.raw(options)  // Buffer流数据
// bodyParser.text(options) // 文本数据


// 通过带有 “/public 前缀的地址来访问 public 目录下面的文件
// app.use('/', express.static(__dirname + '/WebRoot'));
app.use('/public', express.static(__dirname + '/public'));

routes(app)

let port = 5000;
app.listen(port, () => {
  console.log(`app is running at port ${port}`);
})
