var router = require("express").Router();
var mongodb = require("../config/mongo.db");
var ShoppingList = require("../model/shopping-list.model");

router.route("/")
	.get((req, res, next) => {
		ShoppingList.find({})
			.then((shoppingList) => {
				res.status(200).json(shoppingList);
			})
			.catch(next);
	})
	.post((req, res, next) => {
		var shoppingList = new ShoppingList(req.body).save()
		.then((shoppingList) => {
			res.status(200).json(shoppingList);
		})
		.catch(next);
	});

router.route("/:itemId")
	.put((req, res, next) => {
		ShoppingList.findByIdAndUpdate( { _id: req.params.itemId }, req.body)
			.exec()
			.then((shoppingList) => {
				res.json(shoppingList);
			})
			.catch(next);
	})
	.delete((req, res, next) => {
		ShoppingList.findByIdAndUpdate( { _id: req.params.itemId }, req.body)
			.exec()
			.then((shoppingList) => {
				res.json(shoppingList);
			})
			.catch(next);
	});

module.exports = router;
