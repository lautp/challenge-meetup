const mongoose = require('mongoose');

const InviteSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	day: {
		type: String,
		required: true,
	},
	invi: {
		type: Array,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('invite', InviteSchema);
