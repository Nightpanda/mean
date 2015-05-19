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
    

    //Add a single blogpost
    $scope.addBlogPost = function(){
        if(!$scope.title || $scope.title === '') { return; }
        if(!$scope.text || $scope.text === '') { return; }
        $scope.blogPosts.push({
            title: $scope.title,    
            text: $scope.text,
            author: 'Anonymous',
        });
        $scope.title = '';
        $scope.text = '';
        }

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
        $scope.singleBlogPost = blogApi.get({postId: $stateParams.postId}); //Request to get data of a single post.

        
    
    //Add a comment to a single blogpost
    $scope.addComment = function(){
        if(!$scope.title || $scope.title === '') { return; }
        if(!$scope.text || $scope.text === '') { return; }
        $scope.comments.push({
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
