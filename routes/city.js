let express = require('express')

let router = express.Router()

let resultConfig = require('../libs/result.config')

let mongoose = require('mongoose')

let City = mongoose.model('City')

// 列表
router.get('/city/list', (req, res) => {
  City.find().then((result) => {
    console.log(result);
    if (Array.isArray(result)) {

      res.status(200).send(Object.assign({}, resultConfig.success, {
        data: result.reverse()
      }))
    }
  })
})

// 新增
router.post('/city/add', (req, res) => {
  let city = new City(req.body)

  city.save().then(result => {
    console.log('result', result);
    if (result) {
      res.status(200).send(resultConfig.success)

    }
  })
})

// 删除
router.delete('/city/delete', (req, res) => {
  City.findByIdAndRemove(req.body.id, (res1) => {
    res.status(200).send(resultConfig.success)
  })
})
// 编辑
router.put('/city/edit', (req, res) => {
  City.findByIdAndUpdate(req.body._id, req.body, (error, updateObj) => {
    if (error) {
      res.status(200).send(resultConfig.paramsError)
      return
    }

    res.status(200).send(resultConfig.success)
  })
})
// 修改状态
router.post('/city/status', (req, res) => {
  City.findByIdAndUpdate(req.body.id, req.body, (error, updateObj) => {
    if (error) {
      res.status(200).send(resultConfig.paramsError)
      return
    }

    res.status(200).send(resultConfig.success)
  })
})

module.exports = router