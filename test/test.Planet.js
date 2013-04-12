var should = require('should');
var Planet = require('../lib/Planet');

describe('createPlanet',function () {
	it('should create a planet object with max_x of 10 and max_y of 10 with property scents',function (done) {
		var planet = new Planet();
		planet.createPlanet(10,10,function (err,newPlanet) {
			if(err)
			{
				throw err;
			}
			else
			{
				newPlanet.max_x.should.equal(10);
				newPlanet.max_y.should.equal(10);
				newPlanet.should.have.property('scents').with.lengthOf(0);
				done();

				describe('checkCoordinate',function() {
					it('should return false to x coordinate of 11 and y coordinate of 11',function (done) { //test invalid coordinate
						planet.checkCoordinate(11,11,function (err,check) {
							if(err)
							{
								throw err;
							}
							else
							{
								check.should.equal(false);
								done();
							}
						});
					});
					it('should return true to x coordinate of 10 and y coordinate of 10', function (done) {
						planet.checkCoordinate(10,10,function (err,check) {
							if(err)
							{
								throw err;
							}
							else
							{
								check.should.equal(true);
								done();
							}
						});
					});
					it('should return an error when a non numeric value is passed as a parameter',function (done) {
						planet.checkCoordinate('f',10,function (err,check) {
							err.code.should.equal(100);
							done()
						});
					});
				});

				describe('placeScent',function () {
					it('should create a \'scent\' at x = 0, y = 10',function (done) {
						planet.placeScent(0,10,function (err,scent) {
							if(err)
							{
								throw err;
							}
							else
							{
								scent.x.should.equal(0);
								scent.y.should.equal(10);

								planet.scents[0].x.should.equal(0);
								planet.scents[0].y.should.equal(10);
								done();

							}
						});
					});

					it('should return an error when a non numeric value is passed as a parameter',function (done) {
						planet.placeScent('g',4,function (err,scent) {
							err.code.should.equal(100);
							done();
						})
					});

					it('should return an error when a coordinate less than zero is passed as a parameter',function (done) {
						planet.placeScent(-1,-6,function (err,scent) {
							err.code.should.equal(102);
							done();
						});
					});

				});

				describe('checkScents',function () {

					it('should have a property scents with properties of x and y and value of 10 and 10 respectively',function (done) {
						planet.scents[0].x.should.equal(0);
						planet.scents[0].y.should.equal(10);
						done();
					});

					it('should return true when coordinates of x = 0, y = 10 are passed as parameters',function (done) {
						planet.checkScents(0,10,function (err,check) {
							if(err)
							{
								throw err;
							}
							else
							{
								check.should.equal(true);
								done();
							}
						})
					});

					it('should return false when coordinates of x = 1, y = 1 are passed as parameters',function (done) {
						planet.checkScents(1,1,function (err,check) {
							if(err)
							{
								throw err;
							}
							else
							{
								check.should.equal(false);
								done();
							}
						});
					});

					it('should return an error when a non numeric value is passed as a parameter',function (done) {
						planet.checkScents('g','d',function (err,check) {
							err.code.should.equal(100);
							done();
						});
					});

				});
				
			}
		});
	})
});
