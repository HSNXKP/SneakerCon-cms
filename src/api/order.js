import axios from '@/util/request'

export function getAllOrder(queryInfo) {
	return axios({
		url: 'getAllOrder',
		method: 'GET',
        params: {
            ...queryInfo
        }
	})
}


export function deleteOrder(id) {
	return axios({
		url: 'deleteOrder',
		method: 'GET',
        params: {
            id
        }
	})
}

export function updateExpress(visForm) {
	return axios({
		url: 'updateExpress',
		method: 'GET',
        params: {
            ...visForm
        }
	})
}


