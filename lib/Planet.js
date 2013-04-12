/*
PLANET CLASS CREATES A GRID BASED ON COORDINATES GIVEN IN createPlanet()
PROPERTIES : max_x, max_y
METHODS : 
*/

var Planet = module.exports = function () {};

var async = require('async');

var Errors = require('./errors');
var errors = new Errors();

Planet.prototype = {

	max_x : null,
	max_y : null,
	scents : [],

	createPlanet : function (max_x,max_y,callback) {
		var re = /[0-9]/; //Test that inputs are numbers
		
		//Sanitize inputs
		if(re.test(max_x) !== true || re.test(max_y) !== true)
		{
			var err = errors.getError('inputMustBeNumericErr');
			return callback(err);
		}
		else if(max_x > 50 || max_y > 50)
		{
			var err = errors.getError('gridSizeTooLargeErr');
			return callback(err);
		}
		else if(max_x === 0 || max_y === 0)
		{
			var err = errors.getError('coordinateZeroErr');
			return callback(err);
		}
		else //Values are OK!
		{

			this.max_x = max_x;
			this.max_y = max_y;
			return callback(null,this);
		}
	},

	checkCoordinate : function (pos_x,pos_y,callback) { //returns true if a coordinate is valid on the grid / false if it isn't valid on the grid
		var re = /[0-9]/;
		if(re.test(pos_x) !== true || re.test(pos_y) !== true)  //Coordinates must be numbers, silly rabbit!
		{
			var err = errors.getError('inputMustBeNumericErr');
			return callback(err);
		}
		else
		{ 
			if(pos_x < 0 || pos_y < 0) //Good bye robot
			{
				return callback(null,false);
			}
			else if(pos_x > this.max_x || pos_y > this.max_y) //Good bye robot
			{
				return callback(null,false);
			}
			else //Robot is not lost
			{
				return callback(null,true);
			}
		}
	},

	placeScent : function (pos_x,pos_y,callback) { //callback returns with co-ordinates of scent
		var re = /[0-9]/;
		if(re.test(pos_x)!== true || re.test(pos_y) !== true)
		{
			var err = errors.getError('inputMustBeNumericErr');
			return callback(err);
		}
		else
		{
			if(pos_x < 0 || pos_y < 0) //Invalid co-ordinate
			{
				var err = errors.getError('coordinateZeroErr');
				return callback(err);
			}
			else
			{
				var scent = { x : pos_x, y : pos_y };
				this.scents.push(scent);
				return callback(null,scent);
			}
		}
	},

	checkScents : function (pos_x,pos_y,callback) { //Callback returns with true if a scent is found, false if a scent isnt found 
		var re = /[0-9]/;
		if(re.test(pos_x)!== true || re.test(pos_y)!== true)
		{
			var err = errors.getError('inputMustBeNumericErr');
			return callback(err);
		}
		else
		{

			async.filter(this.scents,
				function (scent,callback){
					
					if(pos_x === scent.x && pos_y === scent.y)
					{
						callback(true);
					}
					else
					{
						callback(false);
					}
				},function (result) {
					
					if(result[0])
					{
						return callback(null,true); 
					}
					else
					{
						return callback(null,false);
					}
			});
		}
	} 
}