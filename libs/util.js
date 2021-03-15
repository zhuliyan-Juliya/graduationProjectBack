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