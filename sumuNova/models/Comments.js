var CommentSchema = new mongoose.Schema({
	//text title author upvotes
	title: String,
	text: String,
	author: String,
	upvotes: Number,
	blogPost: {type: mongoose.Schema.Types.ObjectId, ref: 'BlogPosts'}
});

mongoose.model('Comments', CommentSchema);