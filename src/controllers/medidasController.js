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

module.exports = {
	avaliar,
};
