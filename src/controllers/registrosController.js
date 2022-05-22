var registrosModel = require("../models/registrosModel");

function carregarKPIs(req, res) {
	var idFuncionario = req.body.idFuncionarioServer;

	registrosModel
		.carregarKPIs(idFuncionario)
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
				"Houve um erro ao buscar as ultimas registros.",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

module.exports = {};
