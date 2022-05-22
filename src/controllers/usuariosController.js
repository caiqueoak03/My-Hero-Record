var usuariosModel = require("../models/usuariosModel");

function listarFuncionarios(req, res) {
	var idFuncionario = req.body.idFuncionarioServer;

	if (idFuncionario == undefined) {
		res.status(400).send("O idFuncionario está undefined!");
	} else {
		usuariosModel
			.listarFuncionarios(idFuncionario)
			.then(function (resultado) {
				console.log(`\nResultados encontrados: ${resultado.length}`);
				console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

				if (resultado.length == 0) {
					res.status(403).send("Dados não encontrados");
				} else {
					console.log(resultado);
					console.log(resultado[0]);
					res.json(resultado[0]);
				}
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o login! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {};
