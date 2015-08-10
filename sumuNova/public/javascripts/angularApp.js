// angularApp.js
var planErouter = angular.module('planErouter', ['ui.router', 'blogServices'])//, 'gitServices2'])
.config([
'$stateProvider',
'$urlRouterProvider',

function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
            //controller: 'MainCtrl'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'templates/about.html'
            
        })

        .state('games', {
            url: '/games',
            templateUrl: 'templates/games.html',
            controller: 'gamesCtrl'
            
        })

        .state('singlegame', {
            url: '/games/{gameId}',
            templateUrl: 'templates/game.html',
            controller: 'singleGameCtrl'
            
        })

        .state('blogposts', { 
            url: '/blog',
            templateUrl: 'templates/blogposts.html', //<- käytetään kyseistä templatea
            controller: 'blogCtrl'
            
        })

        .state('singlepost', { 
            url: '/blog/{postId}',
            templateUrl: 'templates/post.html', //<- käytetään kyseistä templatea
            controller: 'singleBlogCtrl'
        });

        $urlRouterProvider.otherwise('home');
}])


.controller('blogCtrl', [
    '$scope',
    'blogApi',
    '$stateParams',
    function ($scope, blogApi, $stateParams){
        $scope.blogPosts = blogApi.query(); //Send a request to get all posts (response defined in services.js)
        //It's now an array of all the blogposts
        //find the newest blogpost Id

        $scope.blogPosts.$promise.then(function (result) {
            arrayBlogs = $scope.blogPosts;
  
            lenBlogs = arrayBlogs.length;
            latestBlog = arrayBlogs[lenBlogs-1];
            console.log(latestBlog);
            blogId = latestBlog._id;
            console.log(latestBlog._id);
            $scope.singlePost = blogApi.get({postId: blogId }); //Request to get data of a single post.
            console.log($scope.singlePost);
        });


        

        
    //Add a single blogpost with ngresource method save
    $scope.addBlogPost = function(){
        if(!$scope.formtitle || $scope.formtitle === '') { return; } //if no title has been submited, don't post
        if(!$scope.formtext || $scope.formtext === '') { return; }
        if(!$scope.formauthor || $scope.formauthor === '') { return; } 
        

        //create a new instance to save
        var newBlog = new blogApi();
        //Put the data from the form into the new instance
        newBlog.title = $scope.formtitle;
        newBlog.body = $scope.formtext;
        newBlog.author = $scope.formauthor;

        newBlog.$save(); //Simply save the new Blogpost to the mass

        $scope.formtitle = '';
        $scope.formtext = '';
        $scope.formauthor = '';
        };
    //Add a comment to a single blogpost
    $scope.addComment = function(){
        if(!$scope.formtext || $scope.formtext === '') { return; }        

        var newComment = {body: $scope.formtext, author: $scope.formauthor};
        blogApi.save({postId: latestBlog._id}, newComment);

        $scope.formtitle = '';
        $scope.formtext = '';
        $scope.formauthor = '';
        };
    //Upvote a single comment
    /*
    $scope.incrementUpvotes = function() {
        $scope.singleBlogPost.comment.upvotes += 1;
        }
    */

    }
])

.controller('singleBlogCtrl', [
    '$scope',
    //'commentApi',
    'blogApi',
    '$stateParams',
    //Get the information of a single blogpost.
    function ($scope, blogApi, $stateParams){
        $scope.blogPosts = blogApi.query(); //Send a request to get all posts (response defined in services.js)
        console.log("client side request for single blogpost");
        $scope.singlePost = blogApi.get({postId: $stateParams.postId}); //Request to get data of a single post.        
        //var comments = $scope.singleBlogPost.comments;
        
        $scope.singlePost.$promise.then(function (result) {
        currentBlog = $scope.singlePost;
        //allComments = currentBlog.comments;
        
        //console.log(allComments);
        $scope.singlePost = result;
        });

    //Add a comment to a single blogpost
    $scope.addComment = function(){
        //if(!$scope.formtitle || $scope.formtitle === '') { return; } //if no title has been submited, don't post
        if(!$scope.formtext || $scope.formtext === '') { return; }        

        //Read the information of the comment
        var newComment = {body: $scope.formtext, author: $scope.formauthor};
        //var newComment = new blogApi();
        //newComment.body = $scope.formtext;
        //newComment.author = $scope.formauthor;
        //currentBlog.comments.push(newComment);
        //console.log(currentBlog.comments);

        //push a new comment to the end of the array
        //currentBlog.comments.push(newComment);
        //allComments = currentBlog.comments;
        //console.log(currentBlog.comments);
        //allComments.push(newComment);
        //dave the blog so the comment sticks
        //console.log(currentBlog._id);
        //console.log(newComment);
        //console.log(currentBlog);
        blogApi.save({postId: currentBlog._id}, newComment);


        //Save it inside the current blogpost
        //new comment

        //var newComment = new blogApi();
        //var singlePost = new blogApi.get({postId: $stateParams.postId});
        //console.log(singlePost);
        //var allComments = singlePost.comments;
        //console.log(allComments);

        //Put the data from the form into the new instance
        //singlePost.comments = {title: $scope.formtitle, body: $scope.formtext, author: $scope.formauthor};
        

        //blogApi.save({postId: currentBlog._id}, newComment)
        //newComment.save();
        //singlePost.$save();
        //newComment.save({postId: $stateParams.postId}, newComment);
        //allComments.update({postId: $stateParams.postId}, {comments: {title: $scope.formtitle, body: $scope.formtext, author: $scope.formauthor}});
        //allComments.update({postId: $stateParams.postId}, {comments: {title: $scope.formtitle, body: $scope.formtext, author: $scope.formauthor}});
        //blogApi.update({postId: $stateParams.postId}, {comments: {title: $scope.formtitle, body: $scope.formtext, author: $scope.formauthor}});
        //blogApi.save({comments: {title: $scope.formtitle, body: $scope.formtext, author: $scope.formauthor}});

        //newComment.save({postId: $stateParams.postId}) //Simply save the new comment to the mass
        //$scope.singleBlogPost.comments.save({newComment.title, newComment.body, newComment.author}, function(){});

        $scope.formtitle = '';
        $scope.formtext = '';
        $scope.formauthor = '';
        };
    //Upvote a single comment
    $scope.incrementUpvotes = function() {
        $scope.singleBlogPost.comment.upvotes += 1;
        }

    }

])
    
.controller('gamesCtrl', [
    '$scope',
    'gameApi',
    '$stateParams',
    function ($scope, gameApi, $stateParams){
        $scope.gamePosts = gameApi.query(); //Send a request to get all posts (response defined in services.js)
        //It's now an array of all the blogposts
        //find the newest blogpost Id

        $scope.gamePosts.$promise.then(function (result) {
            arrayBlogs = $scope.gamePosts;
  
            lenBlogs = arrayBlogs.length;
            latestBlog = arrayBlogs[lenBlogs-1];
            blogId = latestBlog._id;
            $scope.singleGamePost = gameApi.get({gameId: blogId }); //Request to get data of a single post.
        });


        

        
    //Add a single blogpost with ngresource method save
    $scope.addGamePost = function(){
        //if(!$scope.formtitle || $scope.formtitle === '') { return; } //if no title has been submited, don't post
        //if(!$scope.formtext || $scope.formtext === '') { return; }
        //if(!$scope.formauthor || $scope.formauthor === '') { return; } 
    
        //create a new instance to save
        var newBlog = new gameApi();
        //Put the data from the form into the new instance
        newBlog.title = $scope.formtitle;
        newBlog.body = $scope.formtext;
        newBlog.features = $scope.formfeatures;
        newBlog.downloadLink = $scope.formdownload;
        newBlog.version = $scope.formversion;
        newBlog.status =  $scope.formstatus;
        newBlog.images = $scope.formimages;

        newBlog.$save(); //Simply save the new Blogpost to the mass

        $scope.formtitle = '';
        $scope.formtext = '';
        $scope.formauthor = '';
        };
    //Add a comment to a single blogpost
    $scope.addComment = function(){
        if(!$scope.formtext || $scope.formtext === '') { return; }        

        var newComment = {body: $scope.formtext, author: $scope.formauthor};
        gameApi.save({gameId: latestBlog._id}, newComment);

        $scope.formtitle = '';
        $scope.formtext = '';
        $scope.formauthor = '';
        };
    //Upvote a single comment
    /*
    $scope.incrementUpvotes = function() {
        $scope.singleBlogPost.comment.upvotes += 1;
        }
    */

    }
])

.controller('singleGameCtrl', [
    '$scope',
    //'commentApi',
    'gameApi',
    '$stateParams',
    //Get the information of a single blogpost.
    function ($scope, gameApi, $stateParams){
        
        $scope.gamePosts = gameApi.query(); //Send a request to get all posts (response defined in services.js)
        console.log("client side request for single blogpost");


        //$scope.singleGamePost = gameApi.get({gameId: $stateParams.gameId}); //Request to get data of a single post.        
        $scope.singleGamePost = gameApi.get({gameId: $stateParams.gameId}); //Request to get data of a single post.
        //var comments = $scope.singleBlogPost.comments;
        
        $scope.singleGamePost.$promise.then(function (result) {
        currentBlog = $scope.singleGamePost;
        //allComments = currentBlog.comments;
        
        //console.log(allComments);
        $scope.singleGamePost = result;
        });

    //Add a comment to a single blogpost
    $scope.addComment = function(){
        //if(!$scope.formtitle || $scope.formtitle === '') { return; } //if no title has been submited, don't post
        if(!$scope.formtext || $scope.formtext === '') { return; }        

        //Read the information of the comment
        var newComment = {body: $scope.formtext, author: $scope.formauthor};
        
        gameApi.save({gameId: currentBlog._id}, newComment);


        $scope.formtitle = '';
        $scope.formtext = '';
        $scope.formauthor = '';
        };
    //Upvote a single comment
    $scope.incrementUpvotes = function() {
        $scope.singleBlogPost.comment.upvotes += 1;
        }

    }

])