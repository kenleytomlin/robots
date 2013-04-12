/*
ROBOTS CLASS
PROPERTIES : pos_x, pos_y, compass_or
*/

var Events = require('events');
var Util = require('util');

var Robot = module.exports = function () {};

var Errors = require('./errors');
var errors = new Errors();

Robot.prototype = {

	pos_x : null,
	pos_y : null,
	compass_or : null,


	//Create and return the robot object.  Set's initial co-ordinates for the robot on the planet's surface
	initRobot : function (start_x,start_y,start_or,callback) {
		
		var coordRe = /[0-9]/;
		var cmdRe = /^[NSEW]$/;

		var self = this;

		if(start_x !== null && start_y !== null && start_or !== null)
		{
			if(coordRe.test(start_x) !== true || coordRe.test(start_y) !== true)
			{
				var err = errors.getError('inputMustBeNumericErr');
				return callback(err);
			}
			if(cmdRe.test(start_or) !== true)
			{
				var err = errors.getError('invalidRobotOrErr');
				return callback(err);
			}
			else
			{
		
				this.pos_x = start_x;
				this.pos_y = start_y;
				this.compass_or = start_or;

				return callback(null,this);

			}
		}
	},

	//Returns the robots current co-ordinates on the planet's surface
	getCoordinates : function () {
		var coord = { pos_x : this.pos_x, pos_y : this.pos_y, compass_or : this.compass_or };
		return coord;
	},

	//Moves a robot to a new co-ordinate / new orientation.  Returns new position + orientation.
	moveRobot : function (cmd,callback) {
		var re = /^[LRF]$/;

		if(re.test(cmd) !== true)
		{
			var err = errors.getError('invalidRobotCmdErr');
			return callback(err);
		}
		else
		{
			switch (cmd) {
				case 'L' :
					if(this.compass_or === 'N')
					{
						this.compass_or = 'W';
					}
					else if(this.compass_or === 'E')
					{
						this.compass_or = 'N';
					}
					else if(this.compass_or === 'S')
					{
						this.compass_or = 'E'
					}
					else if(this.compass_or === 'W')
					{
						this.compass_or = 'S';
					}
				break;
				case 'R' :
					if(this.compass_or === 'N')
					{
						this.compass_or = 'E';
					}
					else if(this.compass_or === 'E')
					{
						this.compass_or = 'S';
					}
					else if(this.compass_or === 'S')
					{
						this.compass_or = 'W';
					}
					else if(this.compass_or === 'W')
					{
						this.compass_or = 'N'
					}
				break;
				case 'F' :
					if(this.compass_or === 'N')
					{
						this.pos_y++;
					}
					else if(this.compass_or === 'E')
					{
						this.pos_x++;
					}
					else if(this.compass_or === 'S')
					{
						this.pos_y--;
					}
					else if(this.compass_or === 'W')
					{
						this.pos_x--;
					}
				break;
			}

			return callback(null,this.getCoordinates());
		}
	},

	reverseRobot : function (cmd,callback) { //Reverse reverses a foraward move made by a robot based on the robots previous orientation
		var re = /^[F]$/;

		if(re.test(cmd) !== true)
		{
			var err = errors.getError('invalidReverseRobCmdErr');
			return callback(err);
		}
		else
		{
			if(this.compass_or === 'N')
			{
				this.pos_y--;
				callback(null,this.getCoordinates());
			}
			else if(this.compass_or === 'E')
			{
				this.pos_x--;
				callback(null,this.getCoordinates());
			}
			else if(this.compass_or === 'S')
			{
				this.pos_y++;
				callback(null,this.getCoordinates());
			}
			else if(this.compass_or === 'W')
			{
				this.pos_x++;
				callback(null,this.getCoordinates());
			}
		}
	}
}