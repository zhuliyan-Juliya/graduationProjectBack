let express = require('express')
let router = express.Router()
let resultConfig = require('../../libs/result.config')

let mongoose = require('mongoose')
let Employee = mongoose.model('Employee')
let Category = mongoose.model('Category')
let City = mongoose.model('City')
let Company = mongoose.model('Company')
let Department = mongoose.model('Department')
const { FindCollectionDataByID, ComputedBalanceDate, ComputedAgeByIdCard, ComputedBirthDateByIdCard } = require('../../libs/util')

// 员工列表
router.get('/employee/list', (req, res) => {
	Employee.find().then(result => {
		if (Array.isArray(result)) {
			result.forEach(item => {
				item.runTime = ComputedBalanceDate(item.join_time);
			})
			res.status(200).send(Object.assign({}, resultConfig.success, {
				data: result.reverse()
			}))
		}
	})
})
// 添加员工
router.post('/employee/add', (req, res) => {
	let task = [
		FindCollectionDataByID(Category, req.body.category_id),
		FindCollectionDataByID(City, req.body.city_id),
		FindCollectionDataByID(Company, req.body.company_id),
		FindCollectionDataByID(Department, req.body.department_id),
	]
	Promise.all(task).then(res => {
		req.body.category = res[0]
		req.body.city = res[1]
		req.body.company = res[2]
		req.body.department = res[3]

		return new Promise(resolve => {
			resolve()
		})
	}).then(() => {
		// 年龄
		req.body.age = req.body.card_type === '1' ? String(ComputedAgeByIdCard(req.body.card_num)) : '未知'
		// 出生日期
		req.body.birth_date = req.body.card_type === '1' ? String(ComputedBirthDateByIdCard(req.body.card_num)) : ''
		// 转正日期
		let employee = new Employee(req.body)
		employee.save().then(result => {
			if (result) {
				res.status(200).send(resultConfig.success)
			}
		})
	})
})

// 编辑员工信息
router.put('/employee/edit', (req, res) => {
	Employee.findByIdAndUpdate(req.body._id, req.body, (error, updateObj) => {
		// console.log('error', updateObj)
		if (error) {
			res.status(200).send(resultConfig.paramsError)
			return
		}

		res.status(200).send(resultConfig.success)
	})
})

router.delete('/employee/delete', (req, res) => {
	Employee.findByIdAndDelete(req.body.id).then(result => {
		if (result) {
			res.status(200).send(resultConfig.success)
		}
	})
})

module.exports = router