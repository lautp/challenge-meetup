const express = require('express');
const router = express.Router();
const axios = require('axios');

// @ruta    GET    api/weather
// @desc    Obtener el tiempo
// @acceso  Publico
router.get('/', async (req, res) => {
	try {
		const forecast = await axios.get(
			'https://api.weatherbit.io/v2.0/forecast/daily?lat=-34.603722&lon=-58.381592&lang=es&key=23635e8570ec473c89a34e55e43887db'
		);
		const temps = forecast.data.data;

		res.status(200).json(temps);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Weather Server Error');
	}
});

module.exports = router;
