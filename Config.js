module.exports = function (app,express)
{	
	app.configure(function(){
	  app.use(express.compress());
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(app.router);
	  app.use(express.static(__dirname + '/public'));
	  app.use(express.cookieParser());
	  app.use(express.session({ secret : 'marsRobots', key : 'connect.sid', cookie : { secure : true } }));
	});
}