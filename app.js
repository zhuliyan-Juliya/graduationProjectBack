let express = require('express')
let fs = require('fs')
let path = require('path')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let { json } = require('express')
let routes = require('./routes');

let app = express()
mongoose.connect('mongodb://localhost/test')

// 通过带有 “/public 前缀的地址来访问 public 目录下面的文件
// app.use('/', express.static(__dirname + '/WebRoot'));
app.use('/public', express.static(__dirname + '/public'));

routes(app)


app.listen(5000, () => {
  console.log(`app is running at port 3000`);
})
