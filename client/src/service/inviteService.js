import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getInvites = async () => {
	try {
		const res = await axios.get('/api/invite');
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const postInvite = async body => {
	try {
		const res = await axios.post('/api/invite', body, config);
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const editInvite = async (body, id) => {
	try {
		const res = axios.put(`/api/invite/${id}`, body, config);
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const deleteInvite = async id => {
	try {
		const res = axios.delete(`/api/invite/${id}`, config);
		return res;
	} catch (err) {
		console.error(err);
	}
};
