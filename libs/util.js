const { Select } = require('./selectOptions')
/**
* 根据ID查询这个类并返对应回数据
* @param {Object} CollectionObj - 查询得集合
* @param {String} id - 查询得id
* @returns {Promise}
*/
module.exports.FindCollectionDataByID = (CollectionObj, id = '') => {
	return new Promise((resolve, reject) => {
		if (!!id) {
			CollectionObj.findById({ _id: id }).then((result) => {
				resolve(result)
			}).catch(error => {
				reject(error)
			})
		} else {
			resolve({})
		}
	})
}
/**
* 求两个日期之间相差 多少年 多少月 多少天
* @param {String} date - 时间格式得字符串
* @returns {String}
*/
module.exports.ComputedBalanceDate = (date) => {
	let target = new Date(date).getTime()
	let now = new Date().getTime()
	let runTime = now - target
	let year = Math.floor(runTime / (365 * 24 * 60 * 60 * 1000))
	runTime = runTime % (365 * 24 * 60 * 60 * 1000)
	let month = Math.floor(runTime / (30 * 24 * 60 * 60 * 1000))
	runTime = runTime % (30 * 24 * 60 * 60 * 1000)
	let day = Math.floor(runTime / (24 * 60 * 60 * 1000));
	return `${year}年${month}月${day}天`
}
/**
* 根据身份证计算年龄
* @param {String} idCard - 时间格式得字符串
* @returns {String}
*/
module.exports.ComputedAgeByIdCard = (idCard) => {
	let now = new Date().getFullYear()
	let age = ''
	switch (idCard.length) {
		case 15: age = now - '19' + idCard.substr(6, 2); break;
		case 18: age = now - idCard.substr(6, 4); break;
	}
	return age
}
/**
* 根据身份证计算出生年月日
* @param {String} idCard - 时间格式得字符串
* @returns {String}
*/
module.exports.ComputedBirthDateByIdCard = (idCard) => {
	let birth_date = ''
	switch (idCard.length) {
		case 15: birth_date = `19${idCard.substr(6, 2)}-${idCard.substr(8, 2)}-${idCard.substr(10, 2)}`; break;
		case 18: birth_date = `${idCard.substr(6, 4)}-${idCard.substr(10, 2)}-${idCard.substr(12, 2)}`; break;
	}
	return birth_date
}
/**
* 计算转正日期	= 入职日期 + 试用期
* @param {String} join_time - 入职日期
* @param {String} probation_period - 试用期
* @returns {String}
*/
module.exports.ComputedFullMemberDate = (join_time, probation_period) => {
	let day = Select.probationPeriodOptions.find(item => item.value === probation_period).label
	let probation_period_time = new Date(new Date(join_time).getTime() + day * 24 * 60 * 60 * 1000)
	console.log('toDate(probation_period_time)', toDate(probation_period_time))
	return toDate(probation_period_time)
}
/**
* 日期转换成字符串格式	附带时分秒
* @param {Date} date - 需要转换的日期
* @returns {String}
*/
function toDateTime (date) {
	const nowDate = date;
	const y = nowDate.getFullYear();
	let m = nowDate.getMonth() + 1;
	m = m < 10 ? `0${m}` : m;
	let d = nowDate.getDate();
	d = d < 10 ? `0${d}` : d;
	let h = nowDate.getHours();
	h = h < 10 ? `0${h}` : h;
	let min = nowDate.getMinutes();
	min = min < 10 ? `0${min}` : min;
	let s = nowDate.getSeconds();
	s = s < 10 ? `0${s}` : s;
	return `${y}-${m}-${d} ${h}:${min}:${s}`;
}
/**
* 日期转换成字符串格式
* @param {Date} date - 需要转换的日期
* @returns {String}
*/
function toDate (date) {
	const nowDate = date;
	const y = nowDate.getFullYear();
	let m = nowDate.getMonth() + 1;
	m = m < 10 ? `0${m}` : m;
	let d = nowDate.getDate();
	d = d < 10 ? `0${d}` : d;
	return `${y}-${m}-${d}`;
}