// 测试接口

var express = require('express')
var http = require('http')
var router = express.Router()
let resultConfig = require('../../libs/result.config')

var mongoose = require('mongoose')

let Category = mongoose.model('Category')

router.get('/category/list', (req, res) => {
	Category.find().then((result) => {
		if (Array.isArray(result)) {

			res.status(200).send(Object.assign({}, resultConfig.success, {
				data: result.reverse()
			}))
		}
	})
})
// 新增
router.post('/category/add', (req, res) => {

	function saveCategory (body) {
		let category = new Category(body)

		category.save().then((result) => {
			if (result) {
				res.status(200).send(resultConfig.success)
			}
		})
	}

	if (req.body.pid) {
		Category.findById({ _id: req.body.pid }).then(findResult => {
			req.body.parent = findResult

			saveCategory(req.body)
		})
	} else {
		saveCategory(req.body)
	}
})

// 删除
router.delete('/category/delete', (req, res) => {
	Category.findByIdAndRemove(req.body.id, (res1) => {
		res.status(200).send(resultConfig.success)
	})
})
// 编辑
router.put('/category/edit', (req, res) => {
	if (req.body.pid) {
		Category.findById({ _id: req.body.pid }).then(findResult => {
			req.body.parent = findResult

			Category.findByIdAndUpdate(req.body._id, req.body, (error, updateObj) => {
				if (error) {
					res.status(200).send(resultConfig.paramsError)
					return
				}

				res.status(200).send(resultConfig.success)
			})

		})
	} else {

		Category.findByIdAndUpdate(req.body._id, req.body, (error, updateObj) => {
			if (error) {
				res.status(200).send(resultConfig.paramsError)
				return
			}

			res.status(200).send(resultConfig.success)
		})
	}


})
// 修改状态
router.post('/category/status', (req, res) => {
	Category.findByIdAndUpdate(req.body.id, req.body, (error, updateObj) => {
		if (error) {
			res.status(200).send(resultConfig.paramsError)
			return
		}

		res.status(200).send(resultConfig.success)
	})
})

module.exports = router