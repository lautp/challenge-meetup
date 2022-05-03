const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const Meetup = require('../model/Meetup');

// @ruta    GET    api/meetup
// @desc    Obtener la meetup
// @acceso  Publico
router.get('/', async (req, res) => {
	try {
		const meetup = await Meetup.find();
		res.json(meetup);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @ruta    POST    api/meetup
// @desc    Agrega una nueva meetup
// @acceso  Privado
router.post(
	'/',
	auth,
	[[body('day', 'Pick day').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				error: errors,
			});
		}

		const { invited, day } = req.body;

		try {
			const newMeetup = new Meetup({
				user: req.user.id,
				day,
				invited,
			});

			const meetup = await newMeetup.save();

			res.json(meetup);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('No anda el post');
		}
	}
);

// @route   PUT    api/meetup/:id
// @desc    Actualiza meetup
// @acceso  Privado
router.put('/:id', auth, async (req, res) => {
	const { invited, day } = req.body;

	//Crea el objeto "meetup"

	const meetupFields = {};
	if (day) meetupFields.day = day;
	if (invited) meetupFields.invited = invited;

	try {
		let meetup = await Meetup.findById(req.params.id);

		if (!meetup) return res.status(404).json({ msg: 'Meetup not found' });

		meetup = await Meetup.findByIdAndUpdate(
			req.params.id,
			{ $set: meetupFields },
			{ new: true }
		);

		res.json(meetup);
	} catch (err) {
		console.error(err.msg);
		res.status(500).send('server error');
	}
});

// @ruta    DELETE    api/meetup/:id
// @desc    Borra una meetup
// @acceso  Publico
router.delete('/:id', auth, async (req, res) => {
	try {
		let meetup = await Meetup.findById(req.params.id);

		if (!meetup) return res.status(404).json({ msg: 'Meetup not found' });

		await Meetup.findByIdAndRemove(req.params.id);

		res.json({
			msg: 'Meetup removed',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
