'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let DesignationSchema = new mongoose.Schema({
	designation: String,  // 部门名称
	deptID: Number, // 所属部门ID
	superiorDeptID: Number,  // 上级职位部门ID
	pid: Number,  // 上级职位ID
	jobClassID: String,  // 职类
	status: Number,  // 状态
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