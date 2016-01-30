'use strict';

angular.module('confusionApp', ['ngRoute'])
.config(function ($routeProvider) {
	
	$routeProvider

	//route to contacts page
	.when('/contactus', {
		templateUrl: 'contactus.html',
		controller: 'ContactController'
	})

	// route to menu page
	.when('/menu', {
		templateUrl: 'menu.html',
		controller: 'MenuController'
	})

	// route to dish details page
	.when('/menu/:id', {
		templateUrl: 'dishdetails.html',
		controller: 'DishDetailsController'
	})

	.otherwise({ redirectTo: '/contactus' });
});
