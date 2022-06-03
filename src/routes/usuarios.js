var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.post("/cadastrarUser", function (req, res) {
	usuariosController.cadastrarUser(req, res);
});

router.post("/login", function (req, res) {
	usuariosController.login(req, res);
});

router.get("/listarIdsUsuarios", function (req, res) {
	usuariosController.listarIdsUsuarios(req, res);
});

router.post("/simularNotas", function (req, res) {
	usuariosController.simularNotas(req, res);
});

router.get("/listarDadosHerois", function (req, res) {
	usuariosController.listarDadosHerois(req, res);
});

router.post("/carregarDados", function (req, res) {
	usuariosController.carregarDados(req, res);
});

router.post("/atualizarUser", function (req, res) {
	usuariosController.atualizarUser(req, res);
});

module.exports = router;
