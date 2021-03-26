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