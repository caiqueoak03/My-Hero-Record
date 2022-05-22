var express = require("express");
var router = express.Router();

var registrosController = require("../controllers/registrosController");

router.post("/carregarKPIs", function (req, res) {
	registrosController.carregarKPIs(req, res);
});

module.exports = router;
