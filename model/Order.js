const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	day: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('order', OrderSchema);
