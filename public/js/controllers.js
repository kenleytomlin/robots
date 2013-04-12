'use strict';

/* Controllers */


function MarsRobotsCtrl($scope,$http,$compile) {
	
	$scope.forms   = [];

	$scope.createPlanet = function(max_x,max_y) {

		$http.post('http://localhost:8080/planetData',{ max_x : max_x, max_y : max_y }).success(function (res) {

			console.log(res);

			if(res.success == true)
			{
				console.log('Success')

				$scope.planet_max_x = res.data.max_x;
				$scope.planet_max_y = res.data.max_y;
				$scope.planet_id = res.data.planet_id;


			}
			else
			{
				console.log('Error');
				$scope.err = res.data.msg;
			}
		});
	}

	$scope.addRobotForm = function () {

		$scope.forms.push({number : $scope.forms });

	}

	$scope.launchRobot = function (start_x,start_y,start_or,cmd) {
		$http.post('http://localhost:8080/launchRobot',{ start_x : start_x, start_y : start_y, start_or : start_or }).success(function (res) {

			console.log(res);

			if(res.success == true)
			{
				console.log('Success');

				$scope.robots[$scope.counter].robot = res.data;
				$scope.robots[$scope.counter]._id = res.robot_id;

				//Robot Created - Send Commands
				$http.post('http://localhost:8080/transmitCmd',{ robotCmd : { robot_id : res.robot_id, cmd : cmd } })
			}
		});
	}
}
