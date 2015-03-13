'use strict';

(function() {

	var app = angular.module('chatwindow', []);
	
	app.controller('MainCtrl', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
		// Texters holds the name of the texter and the body of that texter's current message.
		// This is used for displaying the forms for fakeing input from multiple people texting. 
		$scope.texters = [{'name': 'Hillary', 'body': ''}, {'name': 'Kubla', 'body': ''}, {'name': 'Gaga', 'body': ''}];
		
		// Messages ends up holding an ordered list of each message
		// Each element has the same structure as the elements in the texters array (name and body) 
		$scope.messages = [];
		
		// when the user clicks send on any of the texting forms, add a new message to the chat window
		$scope.sendMessage = function (texterIndex) {
			var message = $scope.texters[texterIndex].body;
			if (message) {
				var texter = $scope.texters[texterIndex].name;
				$scope.messages.push( {'name': texter, 'body': message} );
				$scope.texters[texterIndex].body = '';
				
				//scroll to the last message entered
				// ...or at least that's the theory..
				//..seems to get to the 2nd to last div...more investigation needed here
				$location.hash('last-message');
				$anchorScroll();
			}
		};

	}]);
	
})();