'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let DepartmentSchema = new mongoose.Schema({
	name: String,	// 部门名称
	short_name: String,	// 	简称
	companyID: String,	// 所属公司ID
	company: Object,	// 所属公司
	parentID: String,	// 上级部门ID
	parent: Object,	// 上级部门
	cityID: String,	// 城市ID
	city: Object,	// 城市
	status: Number,	// 状态 1 启用 0 警用
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

DepartmentSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.creatAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	next()
})

module.exports = mongoose.model('Department', DepartmentSchema)