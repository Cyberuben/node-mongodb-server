var http = require("http");
var express = require("express");
var bodyParser = require("body-parser")
var logger = require("morgan");
var mongodb = require("./config/mongo.db");
var config = require("./config/env/env");

var app = express();

module.exports = {};

app.use(bodyParser.urlencoded({
	extended: "true"
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));

app.set("port", (process.env.PORT || config.env.webPort));
app.set("env", (process.env.ENV || "development"));

app.use(logger("dev"));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

app.use("/recipes", require("./api/recipes.routes"));
app.use("/favorites", require("./api/favorites.routes"));
app.use("/shopping-list", require("./api/shopping-list.routes"));

app.use((err, req, res, next) => {
	var error = {
		message: err.message,
		code: err.code,
		name: err.name,
		status: err.status
	}

	res.status(401).send(error);
});

app.use("*", (req, res) => {
	res.status(404);
	res.json({
		"error": "Deze URL is niet beschikbaar."
	});
});

app.listen(config.env.webPort, () => {
	console.log("De server luistert op port " + app.get("port"));
	console.log("Zie bijvoorbeeld http://localhost:3100/recipes");
});

// Voor testen met mocha/chai moeten we de app exporteren.
module.exports = app;
