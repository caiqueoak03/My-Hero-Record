var express = require("express");
var router = express.Router();

var medidasController = require("../controllers/medidasController");

router.post("/pegarOcorrenciasAbsolutas", function (req, res) {
	medidasController.pegarOcorrenciasAbsolutas(req, res);
});

router.post("/pegarOcorrenciasMedias", function (req, res) {
	medidasController.pegarOcorrenciasMedias(req, res);
});

router.post("/pegarOcorrenciasDia", function (req, res) {
	medidasController.pegarOcorrenciasDia(req, res);
});

router.post("/avaliar", function (req, res) {
	medidasController.avaliar(req, res);
});

router.post("/pegarDadosGraficos", function (req, res) {
	medidasController.pegarDadosGraficos(req, res);
});

module.exports = router;
