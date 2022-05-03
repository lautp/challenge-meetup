import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getOrders = async () => {
	try {
		const res = await axios.get('/api/order');
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const postOrder = async body => {
	try {
		const res = await axios.post('/api/order', body, config);
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const editOrder = async (body, id) => {
	try {
		const res = axios.put(`/api/order/${id}`, body, config);
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const deleteOrder = async id => {
	try {
		const res = axios.delete(`/api/order/${id}`, config);
		return res;
	} catch (err) {
		console.error(err);
	}
};
