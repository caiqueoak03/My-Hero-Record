var ocorrenciasModel = require("../models/ocorrenciasModel");

function cadastrarOcorrencia(req, res) {
	const titulo = req.body.titulo;
	const descricao = req.body.descricao;
	const capaUrl = req.body.capaUrl;
	const data = req.body.data;
	const idUser = req.body.idUser;

	ocorrenciasModel
		.cadastrarOcorrencia(titulo, descricao, capaUrl, data, idUser)
		.then(function (resultado) {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send("Nenhum resultado encontrado!");
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"Houve um erro ao buscar as ultimas ocorrencias.",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function carregarOcorrencias(req, res) {
	const idUser = req.body.idUser;

	ocorrenciasModel
		.carregarOcorrencias(idUser)
		.then(function (resultado) {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send("Nenhum resultado encontrado!");
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"Houve um erro ao buscar as ultimas ocorrencias.",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function editarOcorrencia(req, res) {
	const idOcorrencia = req.body.idOcorrencia;
	const titulo = req.body.titulo;
	const descricao = req.body.descricao;
	const capaUrl = req.body.capaUrl;
	const data = req.body.data;

	ocorrenciasModel
		.editarOcorrencia(idOcorrencia, titulo, descricao, capaUrl, data)
		.then(function (resultado) {
			res.status(200).json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log("Houve um erro ao atualizar a ocorrencia.", erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

function excluirOcorrencia(req, res) {
	const idOcorrencia = req.body.idOcorrencia;

	ocorrenciasModel
		.excluirOcorrencia(idOcorrencia)
		.then(function (resultado) {
			res.status(200).json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"Houve um erro ao deletar a última ocorrencia.",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function carregarManchetes(req, res) {
	ocorrenciasModel
		.carregarManchetes()
		.then(function (resultado) {
			res.status(200).json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log("Houve um erro ao carregarManchetes.", erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

module.exports = {
	cadastrarOcorrencia,
	carregarOcorrencias,
	editarOcorrencia,
	excluirOcorrencia,
	carregarManchetes,
};
