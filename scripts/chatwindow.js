'use strict';

(function() {

	var app = angular.module('chatwindow', []);
	
	// texterManager for handling our fake set of people who are sending messages to the chat window
	app.factory('texterManager', [function() {
		var texterObj = {
			// Texters holds the name of the texter and the body of that texter's current message.
			// This is used for displaying the forms for fakeing input from multiple people texting. 
			texters: [{'name': 'Hillary', 'body': ''}, {'name': 'Kubla', 'body': ''}, {'name': 'Gaga', 'body': ''}]
		};
		return texterObj;
	}]);
	
	// messageManager for handling the messages in the chat window itself
	app.factory('messageManager', [function() {
		var msgArr = [];
		
		var msgObj = {	
			// Messages ends up holding an ordered list of each message
			// Each element has a structure like
			// {'name': 'Hillary', 'body': 'I\'m not running yet'} 
			messages: msgArr,
			
			addMessage: function(name, message) {
				msgArr.push( {'name': name, 'body': message} );
			}
		};
		return msgObj;
	}]);
		
	// an attribute to go in the same tag as the ng-repeat directive, which emits an event when ng-repeat is finished
	app.directive('onRepeatEnd', ['$timeout', function($timeout) {
		return {
			restrict: 'A',
			
			link: function(scope, element, attrs) {
				if(scope.$last) {
					$timeout(function() {
						console.log('about to send ngRepeatEnded event');
						scope.$emit('ngRepeatEnded');
					});
				}
			}
		}
	}]);
	
	
	// MainCtrl takes messages from texters and displays them, along with the texters' names in the chat window
	app.controller('MainCtrl', [
		'$scope', 'texterManager', 'messageManager', '$location', '$anchorScroll', 
		
		function($scope, texterManager, messageManager, $location, $anchorScroll) {
			$scope.texters = texterManager.texters;
			$scope.messages = messageManager.messages;
			
			// when the user clicks send on any of the texting forms, add a new message to the chat window
			$scope.sendMessage = function (texterIndex) {
				var texter;
				var message = $scope.texters[texterIndex].body;
				if (message) {
					texter = $scope.texters[texterIndex].name;
					$scope.texters[texterIndex].body = '';
					messageManager.addMessage(texter,message);
				}
			};
			
			//scroll to the last message after the ng-repeat directive has completed adding a new message to the bottom of the chat window
			$scope.$on('ngRepeatEnded', function(scope, element, attrs) {
				console.log('received ngRepeatEnded event');
				
				$location.hash('last-message');
				$anchorScroll();
			});
		}
	]);
	
})();