const mongoose = require('mongoose');

const Create = mongoose.model('Create', {
	
	name: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		minlength: 2,
	},
	age: {
		type: Number,
		min: 18,
		max: 100
	}
});

module.exports = {User}