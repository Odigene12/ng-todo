app.controller("ItemNewCtrl", function($scope, $location, itemStorage){
	// $location is used to change url
	$scope.title = "New Item";
	$scope.submitButtonText = "Add New Item";

	$scope.newTask = {
		assignedTo: "",
		dependencies: "",
		dueDate: "",
		isCompleted: false,
		location: "",
		task: "",
		urgency: "",
		uid: ""
	};	


	$scope.addNewItem = function() {
			itemStorage.postNewItem($scope.newTask)
				.then(function successCallback(response){
					console.log(response);
					$location.url("/items/list");
				})
		};			
});