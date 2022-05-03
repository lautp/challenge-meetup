import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getMeetup = async () => {
	try {
		const res = await axios.get('/api/meetup');
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const postMeetup = async body => {
	try {
		const res = await axios.post(`/api/meetup`, body, config);
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const editMeetup = async (body, id) => {
	try {
		const res = axios.put(`/api/meetup/${id}`, body, config);
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const deleteMeetup = async id => {
	try {
		const res = axios.delete(`/api/meetup/${id}`, config);
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const getUsuarios = async () => {
	try {
		const res = await axios.get('/api/users');
		return res;
	} catch (err) {
		console.error(err);
	}
};
