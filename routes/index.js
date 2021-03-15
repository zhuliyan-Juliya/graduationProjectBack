//请求模块 
var http = require('http');  //HTTP协议模块 
var url = require('url');    //URL解析模块 
var fs = require("fs");      //文件系统模块 
var path = require("path");  //路径解析模块 

//依据路径获取返回内容类型字符串,用于http响应头 
var funGetContentType = function (filePath) {
	var contentType = ''

	//使用路径解析模块获取文件扩展名 
	var ext = path.extname(filePath)

	switch (ext) {
		case ".html":
			contentType = "text/html";
			break;
		case ".js":
			contentType = "text/javascript";
			break;
		case ".css":
			contentType = "text/css";
			break;
		case ".gif":
			contentType = "image/gif";
			break;
		case ".jpg":
			contentType = "image/jpeg";
			break;
		case ".png":
			contentType = "image/png";
			break;
		case ".ico":
			contentType = "image/icon";
			break;
		default:
			contentType = "application/octet-stream";
	}

	return contentType
}

module.exports = function (app) {
	app.use('/api', require('./test'))
	// 组织
	app.use('/api', require('./organization/company'))
	app.use('/api', require('./organization/department'))
	app.use('/api', require('./organization/designation'))
	app.use('/api', require('./organization/category'))
	app.use('/api', require('./organization/city'))
	// 组织
	app.use('/api', require('./staff/employee'))
}