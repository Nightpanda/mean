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

        console.log("Syötettävä tieto:" + newBlog.title);
        //Send a save request to the server for the new blogpost
        //$scope.newBlog = blogApi.save($scope.newBlog, function(){});
        newBlog.$save();
        console.log("Saved" + newBlog.title);
        $scope.formtitle = '';
        $scope.formtext = '';
        $scope.formauthor = '';
        };

    }

    //$http.defaults.headers.common[] //custom header action to retrieve raw data instead of encrypted stuff
])

.controller('singleBlogCtrl', [
    '$scope',
    //'gitApi',
    'blogApi',
    '$stateParams',
    //Get the information of a single blogpost.
    function ($scope, blogApi, $stateParams){
        console.log("client side request for single blogpost");
        $scope.singleBlogPost = blogApi.get({postId: $stateParams.postId}); //Request to get data of a single post.
        console.log($scope.singleBlogPost);

        
    
    //Add a comment to a single blogpost
    $scope.addComment = function(){
        if(!$scope.title || $scope.title === '') { return; }
        if(!$scope.text || $scope.text === '') { return; }
        $scope.comments.save({
            title: $scope.title,    
            text: $scope.text,
            author: 'Anonymous',
            upvotes: 0
        });
        $scope.title = '';
        $scope.text = '';
        }
    //Upvote a single comment
    $scope.incrementUpvotes = function() {
        $scope.comment.upvotes += 1;
        }

    }
])
