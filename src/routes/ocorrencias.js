var express = require("express");
var router = express.Router();

var ocorrenciasController = require("../controllers/ocorrenciasController");

router.post("/cadastrarOcorrencia", function (req, res) {
	ocorrenciasController.cadastrarOcorrencia(req, res);
});

router.post("/carregarOcorrencias", function (req, res) {
	ocorrenciasController.carregarOcorrencias(req, res);
});

router.post("/editarOcorrencia", function (req, res) {
	ocorrenciasController.editarOcorrencia(req, res);
});

router.post("/excluirOcorrencia", function (req, res) {
	ocorrenciasController.excluirOcorrencia(req, res);
});

router.post("/carregarManchetes", function (req, res) {
	ocorrenciasController.carregarManchetes(req, res);
});

module.exports = router;
