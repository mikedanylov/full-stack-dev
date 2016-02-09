'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

	$scope.tab = 1;
	$scope.filtText = '';
	$scope.showDetails = false;
	$scope.showMenu = false;
	$scope.message = "Loading ...";

	menuFactory.getDishes().query(
		function success(response) {
			$scope.dishes = response;
			$scope.showMenu = true;
		},
		function error(response) {
			$scope.message = "Error: " + response.status + " " + response.statusText;
		}
	);

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

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

	$scope.dish = {};
	$scope.showDish = false;
	$scope.message = "Loading...";

	$scope.dish = menuFactory.getDishes().get({
		id: parseInt($stateParams.id, 10)
	})
	.$promise.then(
		function success(response) {
			$scope.dish = response;
			$scope.showDish = true;
		}, function error(response) {
			$scope.message = "Error: " + response.status + " " + response.statusText;
		}
	);
}])

.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

	var dflt = {rating: 5, comment: "", author: "", date: ""};
	$scope.mycomment = dflt;

	$scope.submitComment = function () {
		$scope.mycomment.date = new Date().toISOString();
		$scope.dish.comments.push($scope.mycomment);
		console.log($scope.mycomment);
		menuFactory.getDishes().update({ id: $scope.dish.id }, $scope.dish);
		$scope.commentForm.$setPristine();
		$scope.mycomment = {rating: 5, comment: "", author: "", date: ""};
	};
}])

// implement the IndexController and About Controller here
.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

	// get random featured dish from array of dishes
	$scope.showDish = false;
	$scope.showPromo = false;
	$scope.showLeader = false;
	$scope.message="Loading ...";

	$scope.dish = menuFactory.getDishes().get({id: 0})
	.$promise.then(
		function success(response) {
			$scope.dish = response;
			$scope.showDish = true;
		}, function error(response) {
			$scope.message = "Error: " + response.status + " " + response.statusText;
		}
	);

	$scope.promotion = menuFactory.getPromotion().get({id: 0})
	.$promise.then(
		function success(response) {
			$scope.promotion = response;
			$scope.showPromo = true;
		}, function error(response) {
			$scope.message = "Error: " + response.status + " " + response.statusText;
		}
	);

	$scope.execChef = corporateFactory.getLeaders().get({id: 3})
	.$promise.then(
		function success(response) {
			$scope.execChef = response;
			$scope.showLeader = true;
		}, function error(response) {
			$scope.message = "Error: " + response.status + " " + response.statusText;
		}
	);
}])

.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

	$scope.showLeaders = false;

	$scope.leaders = corporateFactory.getLeaders().query(
		function success(response) {
			$scope.leaders = response;
			$scope.showLeaders = true;
		}, function error(response) {
			$scope.message = "Error: " + response.status + " " + response.statusText;
		}
	);

}])
;
