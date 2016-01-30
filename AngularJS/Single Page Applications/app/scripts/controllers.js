'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
		
	$scope.tab = 1;
	$scope.filtText = '';
	$scope.showDetails = false;

	$scope.dishes = menuFactory.getDishes();
								
	$scope.select = function(setTab) {
		$scope.tab = setTab;
		
		if (setTab === 2) {
			$scope.filtText = "appetizer";
		}
		else if (setTab === 3) {
			$scope.filtText = "mains";
		}
		else if (setTab === 4) {
			$scope.filtText = "dessert";
		}
		else {
			$scope.filtText = "";
		}
	};

	$scope.isSelected = function (checkTab) {
		return ($scope.tab === checkTab);
	};

	$scope.toggleDetails = function() {
		$scope.showDetails = !$scope.showDetails;
	};
}])

.controller('ContactController', ['$scope', function($scope) {

	$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
	
	var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
	
	$scope.channels = channels;
	$scope.invalidChannelSelection = false;
								
}])

.controller('FeedbackController', ['$scope', function($scope) {
		
	$scope.sendFeedback = function() {
			
		console.log($scope.feedback);
		
		if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
			$scope.invalidChannelSelection = true;
			console.log('incorrect');
		}
		else {
			$scope.invalidChannelSelection = false;
			$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
			$scope.feedback.mychannel="";
			$scope.feedbackForm.$setPristine();
			console.log($scope.feedback);
		}
	};
}])

.controller('DishDetailController', ['$scope', 'menuFactory', function($scope, menuFactory) {
	
	$scope.dish= menuFactory.getDish(3);
}])

.controller('DishCommentController', ['$scope', function($scope) {
		
	//Step 1: Create a JavaScript object to hold the comment from the form
	var comment = {
		rating: 5,
		comment: '',
		author: '',
		date: ""
	}

	$scope.comment = comment;

	$scope.submitComment = function () {
		
		//Step 2: Get current date
		$scope.comment.date = new Date().toISOString();
		
		// Step 3: Push the comment into the dish's comment array
		$scope.dish.comments.push($scope.comment);
		// console.log($scope.dish.comments);
		
		//Step 4: reset the form to pristine state
		$scope.commentForm.$setPristine();
		
		//Step 5: reset JavaScript object that holds a comment
		$scope.comment = {
			rating: 5,
			comment: '',
			author: '',
			date: ""
		};

	};
}]);
