module.exports = {
	success: {
		success: true,
		code: 0,
		msg: ''
	},
	paramsError: {
		success: false,
		code: 1,
		msg: '参数错误'
	},
	noLogin: {
		success: false,
		code: -404,
		msg: '没有登录或者登录超时'
	},
	loginErr: {
		success: false,
		code: -401,
		msg: '登录用户名或者密码错误'
	},
	timeout: {
		success: false,
		code: 502,
		msg: '系统响应超时'
	},
	serverError: {
		success: false,
		code: 500,
		msg: '服务器处理出错'
	},
}