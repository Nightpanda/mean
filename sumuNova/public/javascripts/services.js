var blogServices = angular.module('blogServices', ['ngResource']);
//var gitServices2 = angular.module('gitServices2', ['ngResource']);

//A factory that will take handling requests from controllers and deliver them onwards
blogServices.factory('blogApi', ['$resource',
	function($resource) {
		return $resource('blog/:postId', {}, {
			query: {
				method:'GET', 
				params:{
					postId: ''
				}, 
				isArray:true,

			},
			update: {
				method:'PUT'				
			},
		});
	}]);

/*
blogServices.factory('commentApi', ['$resource',
	function($resource) {
		return $resource('blog/:postId', {}, {
			query: {
				method:'GET', 
				params:{
					postId: ''
				}, 
				isArray:true,
				//headers:{'Content-Type':'application/vnd.github.v3.raw+json; charset=UTF-8'}
			},
		});
	}]);
*/