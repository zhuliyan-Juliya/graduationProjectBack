// 测试接口

var express = require('express')
var http = require('http')
var router = express.Router()
let resultConfig = require('../libs/result.config')

var mongoose = require('mongoose')

let Department = mongoose.model('Department')
let City = mongoose.model('City')
let Company = mongoose.model('Company')

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
	// req.body.companyID
	// 获取下	companyID 所对应得内容	req.body.companyID
	// 获取下	cityID 所对应得内容	req.body.cityID
	let task = [
		findInfoByID(req.body.companyID, Company),
		findInfoByID(req.body.cityID, City),
		findInfoByID(req.body.parentID, Department),
	]
	// let task = [findCompany(req.body.companyID), findCity(req.body.cityID)]
	Promise.all(task).then(result => {
		req.body.company = result[0]
		req.body.city = result[1]
		req.body.parent = result[2]

		let department = new Department(req.body)
		department.save().then((result2) => {
			if (result2) {
				res.status(200).send(resultConfig.success)
			}
		})
	})
})
function findInfoByID (id = '', classObject) {
	return new Promise(resolve => {
		if (!!id) {
			classObject.findById({ _id: id }).then(res => {
				resolve(res)
			})
		} else {
			resolve({})
		}
	})
}
// function findCompany (id) {
// 	return new Promise(resolve => {
// 		Company.findById({ _id: id }).then(res => {
// 			resolve(res)
// 		})
// 	})
// }
// function findCity (id) {
// 	return new Promise(resolve => {
// 		City.findById({ _id: id }).then(res => {
// 			resolve(res)
// 		})
// 	})
// }
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