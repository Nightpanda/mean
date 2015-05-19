var BlogSchema = new mongoose.Schema({
	//text title author upvotes
	title: String,
	text: String,
	author: String,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]
});

mongoose.model('BlogPosts', BlogSchema);