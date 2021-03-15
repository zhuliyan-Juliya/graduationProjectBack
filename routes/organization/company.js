// 测试接口

var express = require('express')
var http = require('http')
var router = express.Router()
let resultConfig = require('../../libs/result.config')

var mongoose = require('mongoose')

let Company = mongoose.model('Company')

router.get('/company/list', (req, res) => {
	Company.find().then((result) => {
		if (Array.isArray(result)) {

			res.status(200).send(Object.assign({}, resultConfig.success, {
				data: result.reverse()
			}))
		}
	})
})
// 新增
router.post('/company/add', (req, res) => {
	let company = new Company(req.body)

	company.save().then((result) => {
		if (result) {
			res.status(200).send(resultConfig.success)
		}
	})
})
// 删除
router.delete('/company/delete', (req, res) => {
	Company.findByIdAndRemove(req.body.id, (res1) => {
		res.status(200).send(resultConfig.success)
	})
})
// 编辑
router.put('/company/edit', (req, res) => {
	Company.findByIdAndUpdate(req.body._id, req.body, (error, updateObj) => {
		// console.log('error', updateObj)
		if (error) {
			res.status(200).send(resultConfig.paramsError)
			return
		}

		res.status(200).send(resultConfig.success)
	})
})
// 修改状态
router.post('/company/status', (req, res) => {
	Company.findByIdAndUpdate(req.body.id, req.body, (error, updateObj) => {
		if (error) {
			res.status(200).send(resultConfig.paramsError)
			return
		}

		res.status(200).send(resultConfig.success)
	})
})

module.exports = router