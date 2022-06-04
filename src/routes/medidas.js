var express = require("express");
var router = express.Router();

var medidasController = require("../controllers/medidasController");

router.post("/avaliar", function (req, res) {
	medidasController.avaliar(req, res);
});

module.exports = router;
