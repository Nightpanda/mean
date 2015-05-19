var CommentSchema = new mongoose.Schema({
	//text title author upvotes
	title: String,
	text: String,
	author: String,
	upvotes: Number
});

mongoose.model('Comment', CommentSchema);