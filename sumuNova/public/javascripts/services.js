var blogServices = angular.module('blogServices', ['ngResource']);
//var gitServices2 = angular.module('gitServices2', ['ngResource']);

//A factory that will take handling requests from controllers and deliver them onwards
blogServices.factory('blogApi', ['$resource',
	function($resource) {
		return $resource('/:postId', {}, {
			query: {
				method:'GET', 
				params:{
					postId: 'blog'
				}, 
				isArray:true,
				//headers:{'Content-Type':'application/vnd.github.v3.raw+json; charset=UTF-8'}
			},/*
			get: {
				method:'GET',
				isArray: false,
				headers:{'Accept':'application/vnd.github.v3.raw'}
				//headers:{'Accept':'application/vnd.github.v3.html+json; charset=UTF-8'}
				//headers:{'Accept':'application/vnd.github.v3.html'}
			}
			*/
		});
	}]);

/*gitServices.factory('gitRaw', ['$resource',
	function($resource) {
		return $resource('https://raw.githubusercontent.com/Nightpanda/websiteData/master/blogs/:postId', {}, {
			get: {
				method: 'GET',
				isArray: false,
				headers:{'Accept':'application/vnd.github.v3.raw'}
			}
		});
	}]);
*/