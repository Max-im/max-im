(function($) {
		// carousel
	$("#carousel").owlCarousel({
				items : 1,
				responsive: false,
				autoPlay : 4000,
				transitionStyle : "fade",
				pagination: true,
				navigation : false
	});

	$(".toggleMenu").on('click', function() {
		$(this).toggleClass("on");
		$(".mainMenu").slideToggle();
		return false;
	});

	$( "#accordion" ).accordion();



		
	// ===================

	// the second task

	// ===================

	
	// parsing
	var jsonElem = $.ajax({
		url: "../json/data.json",
		async: false
	});
	var myObj = $.parseJSON(jsonElem.responseText);

	/* 
	----- 1. -----
	*/

	// skills
	function getSkills(){
		var skillsArr = [];
		_.each(myObj, function(val, i){
			_.each(val.skills, function(elem){
				skillsArr.push(elem);
			});
		})
		return skillsArr
	};

	// uniq
	function makeArrUniq(arr){
		var uniqArr = _.uniq(arr);
		return uniqArr;
	}


	// sort
	function sortTheArr(arr){
		var sortArr = _.sortBy(arr);
		return sortArr;
	}


	// total 
	(function getSortUniqSkillsArrea(){
		var total = sortTheArr(makeArrUniq(getSkills()));
		console.log('the first task is:');
		console.log(total);
		console.log('============================');
	})()


	/* 
	----- 2. -----
	*/

	function getNameArr(){
		var nameArr = [];
		_.each(myObj, function(val){
			nameArr.push(val.name);
		})
		console.log("task 2");
		console.log(nameArr);
		return nameArr;
	};

	function countFriends(){
		var friendsAmount = [];
		_.each(myObj, function(val){
			friendsAmount.push(val.friends.length);
		});
			console.log(friendsAmount);
			console.log("-------------");
		return friendsAmount;
	}


		
(function sort(){
	var arrName = getNameArr();
	var arrFriends = countFriends();
	var arrFriendsCopy = [];
	_.each(arrFriends, function(val, i){
		arrFriendsCopy[i] = val;
	});
	arrFriends.sort(function(a,b){return b - a});
	var newArr = [];
	_.each(arrFriendsCopy, function(val, i){
		_.each(arrFriends, function(val, n){
			if (arrFriends[i]==arrFriendsCopy[n]) {
			newArr.push(arrName[n]);
			};
		});
	});
	newArr = _.uniq(newArr);
	console.log(newArr);
	console.log(arrFriends);
	console.log('============================');
	return newArr;
})();

/* 
	----- 3. -----
*/
	console.log("task 3");		

	function getFriends(){
		// var friendsArr = [];
		var allFriends = [];
		_.each(myObj, function(val){
			_.each(val.friends, function(val, i){
				allFriends.push(val.name);
			});
		});
		console.log(_.uniq(allFriends));		
		return _.uniq(allFriends);
	}

	getFriends();


})(jQuery);
