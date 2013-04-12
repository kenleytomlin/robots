/* AUTHOR : Kenley Tomlin
** EMAIL : kenleytomlin@gmail.com
** DATE : 2012/04/09
**
** MISSION CONTROL - Routes to perform the following :-
** Creates planet and positions robots on the surface.  Issues orders to robots.
*/

var async = require('async');
var uuid = require('node-uuid');

var Planet = require('./Planet');
var Robot = require('./Robot');
var Errors = require('./errors');
var errors = new Errors();

var MissionControl = module.exports = function () {};


MissionControl.prototype = {

	planets : [], //Holds the planet data for this mission
	robots : [], //Holds the robot(s) data for this mission

	initPages : function (app) {

		var self = this;

		app.post('/planetData', function (req,res) { self.planetData(req,res);  });
		app.post('/launchRobot',function (req,res) { self.launchRobot(req,res); });
		app.post('/transmitCmd',function (req,res) { self.transmitCmd(req,res); });

	},

	planetData : function (req,res) { //Set up the planet object.

		var self = this;

		var planet = new Planet();
		var planetId = uuid.v1();

		self.planets[planetId] = planet;

		planet.createPlanet(req.body.max_x,req.body.max_y,function (err,planetObj) { //Create the planet
			if(err)
			{
				console.log(err);
				res.json({success : false, data : err });
			}
			else
			{
				console.log('Planet created with %s max_x & %d max_y',planet.max_x,planet.max_y);

				
				
				res.json({ success : true, data : { max_x : planetObj.max_x, max_y : planetObj.max_y, planet_id : planetId } }); //Return response to client
			}
		});
	},

	launchRobot : function (req,res) {
		
		var self = this;

		var robot = new Robot();
		var _id = uuid.v1();
		self.robots[_id] = robot;

		robot.initRobot(req.body.start_x,req.body.start_y,req.body.start_or,function (err,robotObj) {
			if(err)
			{
				console.log(err);
				res.json({success : false, data : err });
			}
			else
			{
				console.log('Robot launched with x : %s & y : %d',robotObj.pos_x,robotObj.pos_y);
				res.json({ success : true, data : robotObj, robot_id : _id });
			}
		});
	},

	transmitCmd : function (req,res) {
		
		var self = this;

		async.waterfall([
			function (callback)
			{

				var planetObj = null;
				var robotObj = null;

				function fireCb() { //Check both functions have returned data
					if(planetObj !== null && robotObj !== null)
					{
						callback(null,planetObj,robotObj); //Waterfall callback 1
					}
				};

				self.__getRobotInstance(req.body.robotCmd.robot_id, function (err,robot) {
					if(err)
					{
						callback(err);
					}
					else
					{
						robotObj = robot;
						fireCb();
					}
				});

				self.__getPlanetInstance(req.body.robotCmd.planet_id, function (err,planet) {
					if(err)
					{
						callback(err);
					}
					else
					{
						planetObj = planet;
						fireCb();
					}
				});
			},
			function (planet,robot,callback) {

				var robotCmdArr = req.body.robotCmd.cmd.split('');

				async.eachSeries(robotCmdArr,function (cmd,callback) { //Loop through each command
					
					robot.moveRobot(cmd,function (err,updPos) { //Move/turn robot
						if(err)
						{
							callback(err);
						}
						else
						{
							console.log(updPos);
							//First check scents then check coordinates
							async.waterfall([
								function (callback) {
									planet.checkScents(updPos.pos_x,updPos.pos_y,function (err,check) {
										if(err)
										{
											callback(err);
										}
										else
										{
											if(check === false) //No scent found move is ok
											{
												callback(null,updPos);
											}
											else if(check === true) //Scent found ignore move reset bot to old position
											{
												robot.reverseRobot(cmd,function (err,updPos) {
													if(err)
													{
														callback(err);
													}
													else
													{
														callback(null,updPos);
													}
												});
											}
										}
									});
								},
								function (updPos,callback) {
									planet.checkCoordinate(updPos.pos_x,updPos.pos_y,function (err,check) {
										if(err)
										{
											callback(err);
										}
										else
										{
											if(check === false) //Robot is lost
											{
												planet.placeScent(updPos.pos_x,updPos.pos_y,function (err,scent) {
													if(err)
													{
														callback(err);
													}
													
												});
												var robotLostErr = errors.getError('robotLostErr'); //Bit of a hack sorry

												robotLostErr.finalPos = { pos_x : updPos.pos_x, pos_y : updPos.pos_y, compass_or : updPos.compass_or };
												robotLostErr.robot_id = req.body.robotCmd.robot_id;
												switch(robotLostErr.finalPos.compass_or) {
													case 'N' :
														robotLostErr.finalPos.pos_y--;
													break;
													case 'S' :
														robotLostErr.finalPos.pos_y++;
													break;
													case 'W' :
														robotLostErr.finalPos.pos_x++;
														break;
													case 'E' :
														robotLostErr.finalPos.pos_x--;
														break;
												}
												callback(robotLostErr);
											}
											else if(check === true)
											{
												callback(null);
											}
										}
									});
								}
							],function (err) {
								if(err)
								{
									callback(err);
								}
								else
								{
									callback(null);
								}
							}); //End of series
						}
					});
				},function (err) {
					if(err)
					{
						callback(err);
					}
					else
					{
						callback(null,robot);//Waterfall callback 2
					}
				});
			}
		],function (err,robot) {
			if(err)
			{
				console.log(err);
				res.json({ success : false, data : err }); //If robot is lost then check on client side
			}
			else
			{
				var finalPos = robot.getCoordinates();
				
				console.log(finalPos);

				res.json({ success : true, data : { finalPos : finalPos, robot_id : req.body.robotCmd.robot_id } });
			}
		}); //End of waterfall
	},

	//Loop through all the robot instances and find those that match the robot_id

	__getRobotInstance : function (robot_id,callback) {
		
		if(this.robots[robot_id] !== null)
		{
			return callback(null,this.robots[robot_id]);
		}
		else
		{
			var err = errors.getError('invalidRobotId');
			callback(err);	
		}
	},

	//Loop through all the robot instances and find those that match the planet_id
	__getPlanetInstance : function (planet_id,callback) {

		if(this.planets[planet_id] !== null)
		{
			return callback(null,this.planets[planet_id]);
		}
		else
		{
			var err = errors.getError('invalidPlanetId');
			callback(err);
		}
	}

}
