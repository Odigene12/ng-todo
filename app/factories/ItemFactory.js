"use strict"
app.factory("itemStorage", function($q, $http){

// this function is here in order to allow you to get the information from firebase instead of the json so that you can play around with the array if necessary.
	var getItemList = function(){
		let items = []
		return $q(function(resolve, reject){
			$http.get("https://todo-angularapp.firebaseio.com/items.json")
				.success(function(itemObject){
					var itemCollection = itemObject; 
					// this is looping through array of objects that it got from firebase through the item0 and so on and extracting each object.
					Object.keys(itemCollection).forEach(function(key){
						// here, it is giving an "id" property to each item in that array and setting its key "item0 and so on" equal to the id.
						itemCollection[key].id=key;
						// pushing it into the empty array at the top "let items = []"
						items.push(itemCollection[key]);
				})
				resolve(items);
			})
			.error(function(error){
				reject(error);
			});
		})
	}

	var deleteItem = function(itemId){
		return $q(function(resolve, reject){
			$http
				.delete("https://todo-angularapp.firebaseio.com/items/"+itemId+".json")
				.success(function(objectFromFirebase){
					resolve(objectFromFirebase)
				})
		})
	}

	// 
	var postNewItem = function(newItem){
		return $q(function(resolve, reject){
				$http.post(
					"https://todo-angularapp.firebaseio.com/items.json",
					JSON.stringify({
						// you use "newItem" because that is what is being passed in instead of "$scope"
						assignedTo: newItem.assignedTo,
						dependencies: newItem.dependencies,
						dueDate: newItem.dueDate,
						isCompleted: newItem.isCompleted,
						location: newItem.location,
						task: newItem.task,
						urgency: newItem.urgency
					})
				)
				.success(
					function(objectFromFirebase) {
						// this is telling you that the promise is completed and ready to use the data
						resolve(objectFromFirebase);
					}
				);
		})
	}

	return {getItemList:getItemList, deleteItem:deleteItem, postNewItem:postNewItem}

});