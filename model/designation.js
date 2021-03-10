'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let DesignationSchema = new mongoose.Schema({
	designation: String,  // 职位名称
	status: Number,  // 状态
	deptID: String, // 所属部门ID
	department: Object, // 所属部门
	jobClassID: String,  // 职类ID
	jobClass: Object,  // 职类
	superiorDeptID: String,  // 上级职位部门ID
	parentDepartment: Object,  // 上级职位部门
	pid: String,  // 上级职位ID
	parentJobClass: Object,  // 上级职位
	desc: String,  // 岗位说明书
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

DesignationSchema.pre('save', function (next) {
	// isNew
	if (this.isNew) {
		this.meta.creatAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	next()
})

module.exports = mongoose.model('Designation', DesignationSchema)