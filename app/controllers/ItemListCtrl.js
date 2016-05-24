app.controller("ItemListCtrl", function($scope, $http, $location, itemStorage){
	$scope.items = [];

// 	var getItems = function () {
// 		$http.get("https://todo-angularapp.firebaseio.com/items.json")
// 			.success(function(itemObject){
// 				var itemCollection = itemObject;
// 		console.log("this is the item collections", itemCollection);
// 		// use this method to get the key value to the object that you are looping through with the "forEach" method
// 		// "Object.keys(itemCollection" returns an array from "item0" which is all the keys. The "forEach" method returns all the keys in that array.  
// 		Object.keys(itemCollection).forEach(function(key){
// 			// this line below adds the id to the object in order to get access to firebase
// 			itemCollection[key].id=key;
// 			// this pushes the scope.items object into the array
// 			$scope.items.push(itemCollection[key]);
// 		})
// 	});
// }
// getItems();

itemStorage.getItemList().then(function(itemCollection){
	console.log("itemCollection from promise", itemCollection);
	$scope.items = itemCollection;
})
	$scope.itemDelete = function(itemId) {
		console.log("this is the itemId", itemId);
		$http
			.delete("https://todo-angularapp.firebaseio.com/items/"+itemId+".json")
			.success(function(response){
				console.log(response);
				$scope.items = [];
				getItems();
			})
	
};
})