require('dotenv').config();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const auth = require('../middleware/auth');

// @ruta		GET			api/users
// @desc		Traer lista de usuarios registrados
// @acceso	Publico
router.get('/', async (req, res) => {
	try {
		const user = await User.find({});
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @ruta    POST    api/users
// @desc    Registrar ususario
// @acceso  Publico
router.post(
	'/',
	[
		body('name', 'Ingrese un nombre valido').not().isEmpty(),
		body('email', 'Ingrese un email valido').isEmail(),
		body('password', 'Ingrese un password de 6 caracteres o mas').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				error: errors,
			});
		}
		const { name, email, password, role } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'El email ya existe' });
			}

			user = new User({
				name,
				email,
				password,
				role,
			});

			const salt = await bcryptjs.genSalt(10);

			user.password = await bcryptjs.hash(password, salt);

			await user.save();

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
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   DELETE    api/user/:id
// @desc    Borra usuario
// @acceso  Privado
router.delete('/:id', auth, async (req, res) => {
	try {
		let user = await User.findById(req.params.id);

		if (!user) return res.status(404).json({ msg: 'User not found' });

		await User.findByIdAndRemove(req.params.id);

		res.json({
			msg: 'User removed',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
