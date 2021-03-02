// 测试接口

var express = require('express')
var http = require('http')
var router = express.Router()

// router.get('/')

router.get('/about/hh', (req, res) => {
  // console.log('req', req);
  res.send('hello zhuliya12157567567321')
})

module.exports = router