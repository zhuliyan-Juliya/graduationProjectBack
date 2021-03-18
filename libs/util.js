/**
* 根据ID查询这个类并返对应回数据
* @param {CollectionObj} Object - 查询得集合
* @param {id} String - 查询得id
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
* @param {date} String - 时间格式得字符串
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