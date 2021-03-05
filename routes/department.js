// 测试接口

var express = require('express')
var http = require('http')
var router = express.Router()
let resultConfig = require('../libs/result.config')

var mongoose = require('mongoose')

let Department = mongoose.model('Department')

router.get('/department/list', (req, res) => {
  Department.find().then((result) => {
    if (Array.isArray(result)) {

      res.status(200).send(Object.assign({}, resultConfig.success, {
        data: result.reverse()
      }))
    }
  })
})
// 新增
router.post('/department/add', (req, res) => {
  let department = new Department(req.body)

  department.save().then((result) => {
    if (result) {
      res.status(200).send(resultConfig.success)
    }
  })
})
// 删除
router.delete('/department/delete', (req, res) => {
  Department.findByIdAndRemove(req.body.id, (res1) => {
    res.status(200).send(resultConfig.success)
  })
})
// 编辑
router.put('/department/edit', (req, res) => {
  Department.findByIdAndUpdate(req.body._id, req.body, (error, updateObj) => {
    if (error) {
      res.status(200).send(resultConfig.paramsError)
      return
    }

    res.status(200).send(resultConfig.success)
  })
})
// 修改状态
router.post('/department/status', (req, res) => {
  Department.findByIdAndUpdate(req.body.id, req.body, (error, updateObj) => {
    if (error) {
      res.status(200).send(resultConfig.paramsError)
      return
    }

    res.status(200).send(resultConfig.success)
  })
})

module.exports = router