const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../model/User');

// @ruta    GET   api/auth
// @desc    Obtener al usuario logeado
// @acceso  Privado
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @ruta    POST    api/auth
// @desc    Autenticar usuario y traer token
// @acceso  Publico
router.post(
	'/',
	[
		body('email', 'Ingrese un email valido').isEmail(),
		body('password', 'Ingrese un password valido').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				error: errors,
			});
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({
					msg: 'Credenciales invalidas',
				});
			}

			const comparePass = await bcryptjs.compare(password, user.password);

			if (!comparePass) {
				return res.status(400).json({
					msg: 'Credenciales invalidas',
				});
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				process.env.jwtSecret,
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.msg);
			res.status(500).json({ msg: 'Server error' });
		}
	}
);

module.exports = router;
