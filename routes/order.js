const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const Order = require('../model/Order');

// @ruta    GET    api/order
// @desc    Obtener todas las ordenes
// @acceso  Privado
router.get('/', auth, async (req, res) => {
	try {
		const order = await Order.find();
		res.json(order);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @ruta    POST    api/order
// @desc    Agrega una nueva orden
// @acceso  Privado
router.post(
	'/',
	auth,
	[[body('quantity', 'Pick amount').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		const { quantity, day } = req.body;

		try {
			const newOrder = new Order({
				user: req.user.id,
				day,
				quantity,
			});

			const order = await newOrder.save();

			res.json(order);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('No anda el post');
		}
	}
);

// @route   PUT    api/order/:id
// @desc    Actualiza orden
// @acceso  Privado
router.put('/:id', auth, async (req, res) => {
	const { quantity, day } = req.body;

	//Crea el objeto "order"

	const orderFields = {};
	if (day) orderFields.day = day;
	if (quantity) orderFields.quantity = quantity;

	try {
		let order = await Order.findById(req.params.id);

		if (!order) return res.status(404).json({ msg: 'Order not found' });

		order = await Order.findByIdAndUpdate(
			req.params.id,
			{ $set: orderFields },
			{ new: true }
		);

		res.json(order);
	} catch (err) {
		console.error(err.msg);
		res.status(500).send('server error');
	}
});

// @ruta    DELETE    api/order/:id
// @desc    Borra una orden
// @acceso  Publico
router.delete('/:id', auth, async (req, res) => {
	try {
		let order = await Order.findById(req.params.id);

		if (!order) return res.status(404).json({ msg: 'Order not found' });

		await Order.findByIdAndRemove(req.params.id);

		res.json({
			msg: 'Order removed',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
