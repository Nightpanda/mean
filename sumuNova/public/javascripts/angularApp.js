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

        .state('game', {
            url: '/game',
            templateUrl: 'templates/game.html'
            
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
    function ($scope, blogApi){
        $scope.blogPosts = blogApi.query(); //Send a request to get all posts (response defined in services.js)
        //It's now an array of all the blogposts
        

        
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

    }
])

.controller('singleBlogCtrl', [
    '$scope',
    //'commentApi',
    'blogApi',
    '$stateParams',
    //Get the information of a single blogpost.
    function ($scope, blogApi, $stateParams){
        console.log("client side request for single blogpost");
        $scope.singleBlogPost = blogApi.get({postId: $stateParams.postId}); //Request to get data of a single post.        
        //var comments = $scope.singleBlogPost.comments;
    
    //Add a comment to a single blogpost
    $scope.addComment = function(){
        if(!$scope.formtitle || $scope.formtitle === '') { return; } //if no title has been submited, don't post
        if(!$scope.formtext || $scope.formtext === '') { return; }        

        //Save it inside the current blogpost
        //new comment

        //var newComment = new commentApi($scope.singleBlogPost.comments);
        var singlePost = new blogApi.get({postId: $stateParams.postId});
        console.log(singlePost);
        //var allComments = singlePost.comments;
        //console.log(allComments);

        //Put the data from the form into the new instance
        singlePost.comments = {title: $scope.formtitle, body: $scope.formtext, author: $scope.formauthor};

        singlePost.$save();
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
    
