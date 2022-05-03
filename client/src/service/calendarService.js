import axios from 'axios';

//Obtener el tiempo en la app
export const getWeather = async () => {
	const res = await axios.get('/api/weather');
	return res;
};
