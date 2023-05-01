import axios from '@/util/request'


export function getAllProduct(queryInfo) {
	return axios({
		url: 'getAllProduct',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}