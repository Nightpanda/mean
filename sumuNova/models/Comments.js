var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	//text title author upvotes
	title: String,
	body: String,
	author: String,
	upvotes: {type: Number, default: 0},
	blogPost: {type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost'}
});

mongoose.model('Comment', CommentSchema);