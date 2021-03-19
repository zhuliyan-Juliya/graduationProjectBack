let mongoose = require('mongoose')

let AccountSchema = new mongoose.Schema({
	login_name: String, // 用户账号
	login_pwd: String, // 用户密码
	real_name: String, // 真实姓名
	nike_name: String, // 昵称
	power: String, // 权限
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

AccountSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}
	next()
})

module.exports = mongoose.model('Account', AccountSchema)