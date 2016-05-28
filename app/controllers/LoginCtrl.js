"use strict"

app.controller("LoginCtrl", function($scope, $location, firebaseURL, AuthFactory){
	let ref = new Firebase(firebaseURL);

	$scope.hasUser = false;

	$scope.account = {
		email: "",
		password: ""
	};

	// this is checking to see if the path that was chosen is equal to logout and if it is, then it unauthorizes you.
	if($location.path() === "/logout") {
		ref.unauth();
	}

	$scope.register = () => {
		console.log("you clicked register");
		ref.createUser({
			email: $scope.account.email,
			password: $scope.account.password
		}, (error, userData) => {
			if(error){
				// This takes the error that firebase sends back and gives it to you. The phrase "Error creating user" is your message that is attached to the firebase message so you know what it is.
				console.log(`Error creating user: ${error}` );
			} else{
				console.log(`Created user account with uid: ${userData.uid}`);
				$scope.login();
			}
		});
	}
	$scope.login = () => {
		console.log("you clicked login");
		AuthFactory
			.authenticate($scope.account)
			.then(() => {
				$scope.hasUser = true;
				$location.path("/");
				$scope.$apply()
			})
	};

})