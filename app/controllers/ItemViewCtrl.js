app.controller("ItemViewCtrl", function($scope, $http, $routeParams){
	$scope.items = [];
	$scope.selectedItem = {};
	console.log($routeParams.itemId);

	$http.get("https://todo-angularapp.firebaseio.com/items.json")
			.success(function(itemObject){
				var itemCollection = itemObject; 
				Object.keys(itemCollection).forEach(function(key){
					itemCollection[key].id=key;
			$scope.items.push(itemCollection[key]);

			// Remember .filter is an array method that returns an array.
			$scope.selectedItem = $scope.items.filter(function(item){
				return item.id === $routeParams.itemId;
			})[0];
		})
	});

});