var Planet = require('./lib/Planet');

var planet = new Planet();

planet.createPlanet(10,10,function (err,newPlanet) {
	if(err)
	{
		console.log(err);
	}
	else
	{
		newPlanet.placeScent(0,10,function (err,scent) {
			if(err)
			{
				console.log(err);
			}
			else
			{
				console.log(newPlanet.scents)
				newPlanet.checkScents(0,10,function (err,check) {
					console.log(check);
				});
				newPlanet.checkScents(10,10,function (err,check) {
					console.log(check);
				});
			}
		});
	}
});