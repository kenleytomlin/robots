var should = require('should');
var Robot = require('../lib/Robot');

describe('initRobot',function () {
	it('should create and return an instance of robot with pos_x of 1 and pos_y of 1 with compass_or of E',function (done) {
		var robot = new Robot();
		robot.initRobot(1,1,'E',function (err,newRobot) {
			if(err)
			{
				throw err;
			}
			else
			{

				newRobot.should.have.property('pos_x');
				newRobot.should.have.property('pos_y');
				newRobot.should.have.property('compass_or');

				newRobot.pos_x.should.equal(1);
				newRobot.pos_x.should.equal(1);
				newRobot.compass_or.should.equal('E');
				
				done();

				describe('getCoordinates',function () {
					
					it('should return an object with properties pos_x pos_y and compass_or with values 1',function (done) {
						
						var coord = newRobot.getCoordinates();
						
						coord.should.have.property('pos_x');
						coord.should.have.property('pos_y');
						coord.should.have.property('compass_or');

						coord.pos_x.should.equal(1);
						coord.pos_y.should.equal(1);
						coord.compass_or.should.equal('E');
						
						done();

					});
				});

				describe('moveRobot',function () {
					
					it('should \'move\' a robot to orientation S with instruction L',function (done) {

						newRobot.moveRobot('R',function (err,updPos) {
							if(err)
							{
								throw err;
							}
							else
							{
								updPos.should.have.property('pos_x');
								updPos.should.have.property('pos_y');
								updPos.should.have.property('compass_or');

								updPos.pos_x.should.equal(1);
								updPos.pos_y.should.equal(1);
								updPos.compass_or.should.equal('S');

								done();
							}
						});
					});

					it('should \'move\' a robot to orientation E with instruction L',function (done) {

						newRobot.moveRobot('L',function (err,updPos) {
							if(err)
							{
								throw err;
							}
							else
							{
								updPos.should.have.property('pos_x');
								updPos.should.have.property('pos_y');
								updPos.should.have.property('compass_or');

								updPos.pos_x.should.equal(1);
								updPos.pos_y.should.equal(1);
								updPos.compass_or.should.equal('E');
								
								done();
							}
						})

					});

					it('should \'move\' a robot to pos_x : 2 pos_y : 1 with instruction F',function (done) {

						newRobot.moveRobot('F',function (err,updPos) {
							if(err)
							{
								throw err;
							}
							else
							{

								updPos.should.have.property('pos_x');
								updPos.should.have.property('pos_y');
								updPos.should.have.property('compass_or');

								updPos.pos_x.should.equal(2);
								updPos.pos_y.should.equal(1);
								updPos.compass_or.should.equal('E');

								done();
							}
						});
					});

					it('should return an error if a value other than L/R/F, in this case parameter is J',function (done) {

						newRobot.moveRobot('J',function (err,updPos) {
							
							err.code.should.equal(103);

							done();
						});

					});

				});

				describe('reverseRobot',function() {
					
					it('should \'move\' a robot back to its previous position',function (done) {

						newRobot.reverseRobot('F',function (err,updPos) {
							if(err)
							{
								throw err;
							}
							else
							{
								updPos.should.have.property('pos_x');
								updPos.should.have.property('pos_y');
								updPos.should.have.property('compass_or');

								updPos.pos_x.should.equal(1);
								updPos.pos_y.should.equal(1);
								updPos.compass_or.should.equal('E');

								done();
							}
						});

					});

					it('should return an error if the parameter is anything except F, in this case the parameter is L',function (done) {

						newRobot.reverseRobot('L',function (err,updPos) {
								
							err.code.should.equal(108);

							done();

						});

					});

				});
			}
		});
	});
});