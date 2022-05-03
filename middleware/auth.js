require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	//Conseguir token del header
	const token = req.header('x-auth-token');

	//Checkear token
	if (!token) {
		return res.status(401).json({ msg: 'No hay token' });
	}

	try {
		const decoded = jwt.verify(token, process.env.jwtSecret);

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({
			msg: 'Token invalida',
		});
	}
};
