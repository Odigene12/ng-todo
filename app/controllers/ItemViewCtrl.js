app.controller("ItemViewCtrl", function($scope, $routeParams, itemStorage){
	$scope.items = [];
	$scope.selectedItem = {};
	console.log($routeParams.itemId);

	itemStorage.getItemList().then(function(itemCollection){
		console.log("itemCollection from promise", itemCollection);
		$scope.items = itemCollection;




			// Remember .filter is an array method that returns an array.
			$scope.selectedItem = $scope.items.filter(function(item){
				// here the filter is comparing the id of the item to the id of the url to see if they equal or match.
				return item.id === $routeParams.itemId;
			})[0];
		})

});