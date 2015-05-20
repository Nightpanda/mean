var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BlogPost = mongoose.model('BlogPost');
var Comment = mongoose.model('Comment');


var db = mongoose.connection;
//Test connection to mongodb
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("Connection succesful");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get all the BlogPosts
router.get('/blog', function(req, res, next) {
	console.log("Request to fetch all blogposts");

	BlogPost.find({}, function(err, results) { //Fetch everything
		if(err){ return next(err); }
		res.json(results);
	});
});

//Fetch information for a single Blog
router.get('/:_id', function(req, res, next) {
	console.log("request to fetch information for a single blogpost");

	BlogPost.findById(req.params._id, function(err, results) {
		if(err){return next(err); }
		console.log(results);
		res.send(results);
	});
});

//Post a blog post
router.post('/blog', function(req, res, next) {
	console.log("post a single blog post");
	var singleBlogPost = new BlogPost(req.text);
	console.log("Tekstiä pitäisi olla:" + "" + singleBlogPost.title);

	singleBlogPost.save(function(err,post){
		if(err){return next(err); }

		res.json(singleBlogPost);
	});
});

//Post a comment about a blog
router.post('/:_id', function(req, res, next) {
	console.log("post a comment about a certain blogpost");
	var singleComment = new Comment(req.text);

	singleComment.save(function(err,post){
		if(err){return next(err); }

		res.json(singleComment);
	});
});


module.exports = router;
