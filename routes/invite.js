const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const Invite = require('../model/Invite');

// @ruta    GET    api/invite
// @desc    Obtener todas las invites
// @acceso  Publico
router.get('/', async (req, res) => {
	try {
		const invite = await Invite.find();
		res.json(invite);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @ruta    POST    api/invite
// @desc    Agrega una nueva invite
// @acceso  Privado
router.post('/', auth, async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

	const { invi, day } = req.body;

	try {
		const newInvite = new Invite({
			user: req.user.id,
			day,
			invi,
		});

		const invite = await newInvite.save();

		res.json(invite);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('No anda el post');
	}
});

// @route   PUT    api/invite/:id
// @desc    Actualiza Invites
// @acceso  Privado
router.put('/:id', auth, async (req, res) => {
	const { invi, day } = req.body;

	//Crea el objeto "invite"

	const inviteFields = {};
	if (day) inviteFields.day = day;
	if (invi) inviteFields.invi = invi;

	try {
		let invite = await Invite.findById(req.params.id);

		if (!invite) return res.status(404).json({ msg: 'Invite not found' });

		invite = await Invite.findByIdAndUpdate(
			req.params.id,
			{ $set: inviteFields },
			{ new: true }
		);

		res.json(invite);
	} catch (err) {
		console.error(err.msg);
		res.status(500).send('server error');
	}
});

// @ruta    DELETE    api/invite/:id
// @desc    Borra invites
// @acceso  Privado
router.delete('/:id', auth, async (req, res) => {
	try {
		let invite = await Invite.findById(req.params.id);

		if (!invite) return res.status(404).json({ msg: 'Meetup not found' });

		await Invite.findByIdAndRemove(req.params.id);

		res.json({
			msg: 'Invite removed',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
