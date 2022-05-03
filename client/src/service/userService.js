import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

//Traer Usuario
export const getUsuario = async () => {
	const res = await axios.get('api/auth');
	return res;
};

//Registrar Usuario
export const regUsuario = async formData => {
	const res = await axios.post('/api/users', formData, config);

	return res;
};

//Loguear Usuario
export const logUsuario = async formData => {
	const config2 = {
		headers: {
			'Content-Type': 'application/json',
			'Status-Code': 200,
		},
	};

	const res = await axios.post('/api/auth', formData, config2);
	return res;
};

//Borrar Usuario
export const deleteUsuario = async id => {
	const res = await axios.delete(`/api/users/${id}`, config);
	return res;
};
