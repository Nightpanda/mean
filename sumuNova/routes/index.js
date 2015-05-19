var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BlogPosts = mongoose.model('BlogPosts');
var Comment = mongoose.model('Comments');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get all the BlogPosts
router.get('/blog', function(req, res, next) {
	console.log("Request to fetch all blogposts");

	BlogPosts.find({}, function(err, results) { //Fetch everything
		if(err){ return next(err); }
		res.json(results);
	});
});

//Fetch information for a single Blog
router.get('/:_id', function(req, res, next) {
	console.log("request to fetch information for a single blogpost");

	BlogPosts.findById(req.params.id, 'id text title author comments', function(err, results) {
		if(err){return next(err); }
		res.send(results);
	});
});

//Post a comment about a blog
router.post('/blog', function(req, res, next) {
	var singleBlogPost = new BlogPosts(req.text);

	singleBlogPost.save(function(err,post){
		if(err){return next(err); }

		res.json(singleBlogPost);
	});
});

//Post a comment about a blog
router.post('/:_id', function(req, res, next) {
	var singleComment = new Comment(req.text);

	singleComment.save(function(err,post){
		if(err){return next(err); }

		res.json(singleComment);
	});
});


module.exports = router;
