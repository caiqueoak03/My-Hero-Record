var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.post("/listarFuncionarios", function (req, res) {
	usuariosController.listarFuncionarios(req, res);
});

module.exports = router;
