/* AUTHOR : KENLEY TOMLIN
** EMAIL : kenleytomlin@gmail.com
** DATE : 2012/04/09
** MARS ROBOTS - BASIC WEB SERVER VIA EXPRESS
*/

var re = /^[0-9]{2,4}$/;

if(process.argv.length === 3 && re.test(process.argv[2]) === true)
{
		var http = require('http');
		var express = require('express');

		var app = express();

		var config = require('./Config')(app,express);

		var MissionControl = require('./lib/MissionControl');
		var missionControl = new MissionControl();
		missionControl.initPages(app);

		var server = http.createServer(app).listen(process.argv[2]);
		console.log('Express Server Started On Port %s',process.argv[2]);
}
else
{
	console.log('Insufficient / Incorrect arguments, server must be started with node app <port>');
	process.exit(1);
}