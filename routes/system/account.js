let express = require('express')
let router = express.Router()
let resultConfig = require('../../libs/result.config')

let mongoose = require('mongoose')
let Account = mongoose.model('Account')

router.get('/account/list', (req, res) => {
	Account.find().then(result => {
		if (Array.isArray(result)) {
			res.status(200).send(Object.assign({}, resultConfig.success, {
				data: result.reverse()
			}))
		}
	})
})

router.post('/account/add', (req, res) => {
	let account = new Account(req.body)
	account.save().then(result => {
		if (result) {
			res.status(200).send(resultConfig.success)
		}
	})
})

router.put('/account/edit', (req, res) => {
	Account.findByIdAndUpdate(req.body._id, req.body, err => {
		if (err) {
			res.status(200).send(resultConfig.serverError)
			return
		}
		res.status(200).send(resultConfig.success)

	})
})

router.post('/login', (req, res) => {
	Account.findOne({ login_name: req.body.login_name }).then((result) => {
		// 没账号
		if (!result) {
			res.status(200).send(resultConfig.loginErr)
		}
		// 成功
		if (result.login_pwd === req.body.login_pwd) {
			res.status(200).send(Object.assign({}, resultConfig.success, {
				data: result
			}))
		} else {
			// 密码没对上
			res.status(200).send(resultConfig.loginErr)
		}
	})
	// Account.find().then(result => {
	// 	console.log('result', result)
	// })
})

module.exports = router