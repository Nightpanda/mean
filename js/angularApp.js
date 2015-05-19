// angularApp.js
var planErouter = angular.module('planErouter', ['ui.router', 'gitServices'])//, 'gitServices2'])
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
    'gitApi',
    function ($scope, gitApi){
        $scope.blogPosts = gitApi.query(); //Send a request to get all posts (response defined in services.js)
    }

    //$http.defaults.headers.common[] //custom header action to retrieve raw data instead of encrypted stuff
])

.controller('singleBlogCtrl', [
    '$scope',
    //'gitApi',
    'gitRaw',
    '$stateParams',
    //Get the information of a single blogpost.
    function ($scope, gitRaw, $stateParams){
        //console.log($stateParams.postId);
        //console.log($stateParams.postId+".html");
        //var getParam = $stateParams.postId+".html";
        $scope.singleBlogPost = gitRaw.get({postId: $stateParams.postId}); //Request to get data of a single post.
        
    },
    //Add a comment to a single blogpost
    function addComment($scope, $stateParams){
        if(!$scope.title || $scope.title === '') { return; }
        if(!$scope.text || $scope.text === '') { return; }
        $scope.post.push({
            title: $scope.title,    
            text: $scope.text,
            author: 'Anonymous',
            upvotes: 0
        });
        $scope.title = '';
        $scope.text = '';
    },
    //Upvote a single comment
    function incrementUpvotes ($scope) {
        $scope.comment.upvotes += 1;
    }
])
