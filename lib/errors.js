/* Author : Kenley Tomlin
** Email : kenleytomlin@gmail.com
** Date : 2012/04/09
** Contains error messages and codes that can be returned to a user for display
*/

var errors = module.exports = function () {};

errors.prototype = {

	errors : {

		inputMustBeNumericErr 	: 	{ code : 100, msg : 'Inputs must be numeric' },
		gridSizeTooLargeErr 	: 	{ code : 101, msg : 'Cannot create a grid with a max cordinate over 50!' },
		coordinateZeroErr 		: 	{ code : 102, msg : 'Coordinates must be a value larger than 0' },
		invalidRobotCmdErr 		: 	{ code : 103, msg : 'Robot commands must be L/R/F' },
		invalidRobotOrErr 		: 	{ code : 104, msg : 'Robot orientation must be N/S/E/W' },
		invalidRobotIdErr		: 	{ code : 105, msg : 'Invalid robot id string' },
		invalidPlanetIdErr 		: 	{ code : 106, msg : 'Invalid planet id string' },
		robotLostErr			:   { code : 107, msg : 'Lost' },
		invalidReverseRobCmdErr	: 	{ code : 108, msg : 'Reverse robot commands must only be F' }

	},

	getError : function (error) { //returns error object
		switch (error) {
			case 'inputMustBeNumericErr' :
				return this.errors.inputMustBeNumericErr;
			break;
			case 'gridSizeTooLargeErr' :
				return this.errors.gridSizeTooLargeErr;
			break;
			case 'coordinateZeroErr' :
				return this.errors.coordinateZeroErr;
			break;
			case 'invalidRobotCmdErr' :
				return this.errors.invalidRobotCmdErr;
			break;
			case 'invalidRobotOrErr' :
				return this.errors.invalidRobotOrErr;
			break;
			case 'invalidRobotIdErr' :
				return this.errors.invalidRobotIdErr;
			break;
			case 'invalidPlanetIdErr' :
				return this.errors.invalidPlanetIdErr;
			break;
			case 'robotLostErr' :
				return this.errors.robotLostErr;
			break;
			case 'invalidReverseRobCmdErr' :
				return this.errors.invalidReverseRobCmdErr;
			break;
		}
	}
}