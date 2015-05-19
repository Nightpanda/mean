var BlogSchema = new mongoose.Schema({
	//text title author upvotes
	id: String,
	title: String,
	text: String,
	author: String,
	comments: Schema.CommentSchema
});

mongoose.model('BlogPosts', BlogSchema);