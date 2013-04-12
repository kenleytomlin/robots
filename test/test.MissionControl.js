var should = require('should');
var request = require('request');

var planet_id;
var robot_id;

describe('planetData',function () {
	it('should create and push a planet object with dimension 5 * 3 to planets[] and give it a unique id, then return a response',function (done) {

		request.post({ url : 'http://localhost:8080/planetData', body : { max_x : 5, max_y : 3 }, json : true },function (err,response,body) {

			body.should.have.property('data');
			body.data.should.have.property('max_x');
			body.data.should.have.property('max_y');
			body.data.should.have.property('planet_id');
			body.should.have.property('success');
			body.success.should.equal(true);
			body.data.max_x.should.equal(5);
			body.data.max_y.should.equal(3);

			planet_id = body.data.planet_id;

			done();
		});

	});

	it('should return success false and data.err with code 101',function (done) {

		request.post({ url : 'http://localhost:8080/planetData', body : { max_x : 60, max_y : 60 }, json : true },function (err,response,body) {

			body.should.have.property('data');
			body.should.have.property('success');
			body.success.should.equal(false);
			body.data.should.have.property('code');
			body.data.should.have.property('msg');
		 	body.data.code.should.equal(101);

		 	done();
		});

	});

	it('should return success false and data.err with code 100',function (done) {

		request.post({ url : 'http://localhost:8080/planetData', body : { max_x : 50, max_y : 'd' }, json : true },function (err,response,body) {

			body.should.have.property('data');
			body.should.have.property('success');
			body.success.should.equal(false);
			body.data.should.have.property('code');
			body.data.should.have.property('msg');
		 	body.data.code.should.equal(100);

		 	done();
		});

	});

	it('should return success false and data.err with code 102',function (done) {

		request.post({ url : 'http://localhost:8080/planetData', body : { max_x : 0, max_y : 0 }, json : true },function (err,response,body) {

			body.should.have.property('data');
			body.should.have.property('success');
			body.success.should.equal(false);
			body.data.should.have.property('code');
			body.data.should.have.property('msg');
		 	body.data.code.should.equal(102);

		 	done();
		});
	});

});


describe('launchRobot',function () {

	it('should create a robot at position x : 1, y : 1, compass_or : \'E\'',function (done) {

		request.post({ url : 'http://localhost:8080/launchRobot', body : { start_x : 1, start_y : 1, start_or : 'E' }, json : true },function (err,response,body) {

			body.should.have.property('data');
			body.should.have.property('success');
			body.data.should.have.property('pos_x');
			body.data.should.have.property('pos_y');
			body.data.should.have.property('compass_or');
			body.should.have.property('robot_id');
			body.success.should.equal(true);
			body.data.pos_x.should.equal(1);
			body.data.pos_y.should.equal(1);
			body.data.compass_or.should.equal('E');

			robot_id = body.robot_id;

			done();

		});
	});

	it('should return success false and error code 100',function (done) {

		request.post({ url : 'http://localhost:8080/launchRobot', body : { start_x : 1, start_y : 'D', start_or : 'E' }, json : true },function (err,response,body) {

			body.should.have.property('success');
			body.should.have.property('data');
			body.data.should.have.property('code');
			body.data.should.have.property('msg');
			body.success.should.equal(false);
			body.data.code.should.equal(100);

			done();

		});

	});

	it('should return success false and error code 104',function (done) {

		request.post({ url : 'http://localhost:8080/launchRobot', body : { start_x : 1, start_y : 1, start_or : 'H' }, json : true },function (err,response,body) {

			body.should.have.property('success');
			body.should.have.property('data');
			body.data.should.have.property('code');
			body.data.should.have.property('msg');
			body.success.should.equal(false);
			body.data.code.should.equal(104);

			done();

		});

	});

});

describe('transmitCmd',function () {
	
	it('should move robot to position x : 1 y : 1 compass_or : E',function (done) {

		request.post({ url : 'http://localhost:8080/transmitCmd', body : { robotCmd : { robot_id : robot_id, planet_id : planet_id, cmd : 'RFRFRFRF' } }, json : true },function (err,response,body) {

			body.should.have.property('success');
			body.should.have.property('data');
			body.data.should.have.property('finalPos');
			body.data.should.have.property('robot_id');

			done();

		});

	});
});

describe('transmitCmd2',function () {
	it('should create a new robot at position 3 2 N',function (done) {

		request.post({ url : 'http://localhost:8080/launchRobot', body : { start_x : 3, start_y : 2, start_or : 'N' }, json : true },function (err,response,body) {

			body.should.have.property('data');
			body.should.have.property('success');
			body.data.should.have.property('pos_x');
			body.data.should.have.property('pos_y');
			body.data.should.have.property('compass_or');
			body.should.have.property('robot_id');
			body.success.should.equal(true);
			body.data.pos_x.should.equal(3);
			body.data.pos_y.should.equal(2);
			body.data.compass_or.should.equal('N');

			robot_id = body.robot_id;

			done();

		});

	});

	it('should move robot to position x : 3 3 N LOST',function (done) {

		request.post({ url : 'http://localhost:8080/transmitCmd', body : { robotCmd : { robot_id : robot_id, planet_id : planet_id, cmd : 'FRRFLLFFRRFLL' } }, json : true },function (err,response,body) {

			body.should.have.property('success');
			body.should.have.property('data');
			body.data.should.have.property('finalPos');
			body.data.should.have.property('robot_id');



			done();

		});

	});
});


describe('transmitCmd3',function () {

	it('should create a new robot at position 0 3 W',function (done) {

		request.post({ url : 'http://localhost:8080/launchRobot', body : { start_x : 0, start_y : 3, start_or : 'W' }, json : true },function (err,response,body) {

			body.should.have.property('data');
			body.should.have.property('success');
			body.data.should.have.property('pos_x');
			body.data.should.have.property('pos_y');
			body.data.should.have.property('compass_or');
			body.should.have.property('robot_id');
			body.success.should.equal(true);
			body.data.pos_x.should.equal(0);
			body.data.pos_y.should.equal(3);
			body.data.compass_or.should.equal('W');

			robot_id = body.robot_id;

			done();

		});

	});

	it('should move robot to position x : 2 y : 3 S',function (done) {

		request.post({ url : 'http://localhost:8080/transmitCmd', body : { robotCmd : { robot_id : robot_id, planet_id : planet_id, cmd : 'LLFFFLFLFL' } }, json : true },function (err,response,body) {

			body.should.have.property('success');
			body.should.have.property('data');
			body.data.should.have.property('finalPos');
			body.data.should.have.property('robot_id');

			done();

		});

	});

});
