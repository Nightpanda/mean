var mongoose = require('mongoose');

var Comments = new mongoose.Schema({
	//text title author upvotes
	//title: String,
	body: String,
	author: {type: String, default: "Anonymous"},
	upvotes: {type: Number, default: 0},
	//blogPost: {type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost'}
});

var GameSchema = new mongoose.Schema({
	title: String,
	body: [],
	features: [],
	downloadLink: String,
	version: String,
	status: String,
	images: [],
	comments: [Comments],
});

mongoose.model('GamePost', GameSchema);