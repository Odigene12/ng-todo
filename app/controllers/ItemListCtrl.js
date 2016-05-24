app.controller("ItemListCtrl", function($scope, $http, $location, itemStorage){
	$scope.items = [];

// This is where the factory ("itemStorage") is called in order to get all of the items in your Firebase and makes them available to be placed onto the dom. 
itemStorage.getItemList().then(function(itemCollection){
	console.log("itemCollection from promise", itemCollection);
	$scope.items = itemCollection;
})

	// This function makes it available to the HTML file in order to delete that specific item using the delete button which calls this function using "ng-click"
	$scope.itemDelete = function(itemId) {
		console.log("this is the itemId", itemId);
		itemStorage.deleteItem(itemId).then(function(response){
			itemStorage.getItemList().then(function(itemCollection){
				$scope.items = itemCollection;
			})
		})
			}
})			

