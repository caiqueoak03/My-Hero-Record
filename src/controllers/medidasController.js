var medidasModel = require("../models/medidasModel.js");

function avaliar(req, res) {
	let fkHeroi = req.body.fkHeroi;
	let nota = req.body.nota;
	let fkComum = req.body.fkComum;

	medidasModel
		.avaliar(fkHeroi, nota, fkComum)
		.then(function (resultado) {
			res.status(200).json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log("Houve um erro ao avaliar.", erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

function pegarOcorrenciasAbsolutas(req, res) {
	const parametro = req.body.parametro;
	const idHeroi = req.body.idHeroi;

	medidasModel
		.pegarOcorrenciasAbsolutas(parametro, idHeroi)
		.then(function (resultado) {
			res.status(200).json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"Houve um erro ao pegarOcorrenciasAbsolutas.",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function pegarOcorrenciasMedias(req, res) {
	const parametro = req.body.parametro;
	const idHeroi = req.body.idHeroi;

	medidasModel
		.pegarOcorrenciasMedias(parametro, idHeroi)
		.then(function (resultado) {
			res.status(200).json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log("Houve um erro ao pegarOcorrenciasMedias.", erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

function pegarOcorrenciasDia(req, res) {
	const dataOcorrencia = req.body.dataOcorrencia;
	const idHeroi = req.body.idHeroi;

	medidasModel
		.pegarOcorrenciasDia(dataOcorrencia, idHeroi)
		.then(function (resultado) {
			res.status(200).json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log("Houve um erro ao pegarOcorrenciasDia.", erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

function pegarDadosGraficos(req, res) {
	const idHeroi = req.body.idHeroi;

	medidasModel
		.pegarDadosGraficos(idHeroi)
		.then(function (resultado) {
			res.status(200).json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log("Houve um erro ao pegarDadosGraficos.", erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

module.exports = {
	avaliar,
	pegarOcorrenciasAbsolutas,
	pegarOcorrenciasMedias,
	pegarOcorrenciasDia,
	pegarDadosGraficos,
};
