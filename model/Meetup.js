const mongoose = require('mongoose');

const MeetupSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	day: {
		type: String,
		required: true,
	},
	invited: {
		type: Array,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('meetup', MeetupSchema);
