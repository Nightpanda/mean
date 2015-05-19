var gitServices = angular.module('gitServices', ['ngResource']);
//var gitServices2 = angular.module('gitServices2', ['ngResource']);

//A factory that will take handling requests from controllers and deliver them onwards
gitServices.factory('gitApi', ['$resource',
	function($resource) {
		return $resource('https://api.github.com/repos/nightpanda/websiteData/contents/blogs/:postId', {}, {
		//return $resource('https://raw.githubusercontent.com/Nightpanda/websiteData/master/blogs/:postId', {}, {
			//return $resource('/blogs/:postId', {}, {
			query: {
				method:'GET', 
				params:{
					postId: ''
				}, 
				isArray:true,
				//headers:{'Content-Type':'application/vnd.github.v3.raw+json; charset=UTF-8'}
			},
			get: {
				method:'GET',
				//url:' 	https://raw.githubusercontent.com/Nightpanda/websiteData/master/blogs/:postId',
				//url: 'https://api.github.com/repos/Nightpanda/websiteData/git/blobs/:postId',
				//url: 'https://api.github.com/repos/Nightpanda/websiteData/contents/blogs/:postId?ref=master',
				//url: 'https://github.com/Nightpanda/websiteData/blob/master/blogs/:postId',
				isArray: false,
				headers:{'Accept':'application/vnd.github.v3.raw'}
				//headers:{'Accept':'application/vnd.github.v3.html+json; charset=UTF-8'}
				//headers:{'Accept':'application/vnd.github.v3.html'}
			}
			
		});
	}]);

gitServices.factory('gitRaw', ['$resource',
	function($resource) {
		return $resource('https://raw.githubusercontent.com/Nightpanda/websiteData/master/blogs/:postId', {}, {
			get: {
				method: 'GET',
				isArray: false,
				headers:{'Accept':'application/vnd.github.v3.raw'}
			}
		});
	}]);