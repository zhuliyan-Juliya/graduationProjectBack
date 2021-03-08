// 测试接口

var express = require('express')
var http = require('http')
var router = express.Router()
let resultConfig = require('../libs/result.config')

var mongoose = require('mongoose')

let Designation = mongoose.model('Designation')

router.get('/designation/list', (req, res) => {
  Designation.find().then((result) => {
    if (Array.isArray(result)) {

      res.status(200).send(Object.assign({}, resultConfig.success, {
        data: result.reverse()
      }))
    }
  })
})
// 新增
router.post('/designation/add', (req, res) => {

  function saveItem (body) {
    let designation = new Designation(body)

    designation.save().then((result) => {
      if (result) {
        res.status(200).send(resultConfig.success)
      }
    })
  }

  if (req.body.pid) {
    Designation.findById({ _id: req.body.pid }).then(findResult => {
      req.body.parent = findResult

      saveItem(req.body)
    })
  } else {
    saveItem(req.body)
  }
})

// 删除
router.delete('/designation/delete', (req, res) => {
  Designation.findByIdAndRemove(req.body.id, (res1) => {
    res.status(200).send(resultConfig.success)
  })
})
// 编辑
router.put('/designation/edit', (req, res) => {
  if (req.body.pid) {
    Designation.findById({ _id: req.body.pid }).then(findResult => {
      req.body.parent = findResult

      Designation.findByIdAndUpdate(req.body._id, req.body, (error, updateObj) => {
        if (error) {
          res.status(200).send(resultConfig.paramsError)
          return
        }

        res.status(200).send(resultConfig.success)
      })

    })
  } else {

    Designation.findByIdAndUpdate(req.body._id, req.body, (error, updateObj) => {
      if (error) {
        res.status(200).send(resultConfig.paramsError)
        return
      }

      res.status(200).send(resultConfig.success)
    })
  }


})
// 修改状态
router.post('/designation/status', (req, res) => {
  Designation.findByIdAndUpdate(req.body.id, req.body, (error, updateObj) => {
    if (error) {
      res.status(200).send(resultConfig.paramsError)
      return
    }

    res.status(200).send(resultConfig.success)
  })
})

module.exports = router