'use strict'

let mongoose = require('mongoose')

let EmployeeSchema = new mongoose.Schema({
	serial_num: String,	//	员工编号
	name: String,//	姓名
	show_name: String,//	显示名
	sex: Number,//	性别	1男0女
	phone: String,//	手机号
	card_type: String,//	证件类型	前端页面查看
	card_num: String,//	证件号码
	job_category: String,//	工作性质：前端页面查看
	staff_status: String,//	员工状态：前端页面查看
	start_work_time: String,//	开始工作时间
	join_time: String,//	入职时间
	probation_period: String,//	试用期
	contract_time: String,//	合同年限
	company_id: String,//	所属公司/中心ID
	company: Object,//	所属公司/中心
	department_id: String,//	部门ID
	department: Object,//	部门
	category_id: String,//	职位ID
	category: Object,//	职位
	city_id: String,//	工作城市ID
	city: Object,//	工作城市
	rank_id: String,//	职级ID
	runTime: String, // 司龄
	hight_education: Number, // 最高学历
	politics_status: Number, // 政治面貌
	nation: String, // 户口类型
	registered_address: String, // 户籍地址
	registered_permanent_residence: String, // 户口所在地
	meta: {
		creatAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

EmployeeSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	next()
})

module.exports = mongoose.model('Employee', EmployeeSchema)