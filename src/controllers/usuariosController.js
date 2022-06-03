var usuariosModel = require("../models/usuariosModel");

function cadastrarUser(req, res) {
	const nome = req.body.nome;
	const sobrenome = req.body.sobrenome;
	const email = req.body.email;
	const senha = req.body.senha;
	const perfil = req.body.perfil;
	const codinome = req.body.codinome;
	const numLicença = req.body.numLicença;
	const individualidade = req.body.individualidade;
	const imgCapaUrl = req.body.imgCapaUrl;
	const imgPerfilUrl = req.body.imgPerfilUrl;
	const imgRankingUrl = req.body.imgRankingUrl;

	if (nome == undefined) {
		res.status(400).send("O nome está undefined!");
	} else if (sobrenome == undefined) {
		res.status(400).send("O sobrenome está undefined!");
	} else if (email == undefined) {
		res.status(400).send("O email está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("O senha está undefined!");
	} else if (codinome == undefined) {
		res.status(400).send("O codinome está undefined!");
	} else if (numLicença == undefined) {
		res.status(400).send("O numLicença está undefined!");
	} else if (individualidade == undefined) {
		res.status(400).send("O individualidade está undefined!");
	} else if (imgCapaUrl == undefined) {
		res.status(400).send("O imgCapaUrl está undefined!");
	} else if (imgPerfilUrl == undefined) {
		res.status(400).send("O imgPerfilUrl está undefined!");
	} else if (perfil == undefined) {
		res.status(400).send("O perfil está undefined!");
	} else if (imgRankingUrl == undefined) {
		res.status(400).send("O imgRankingUrl está undefined!");
	} else {
		usuariosModel
			.cadastrarUser(
				nome,
				sobrenome,
				email,
				senha,
				perfil,
				codinome,
				numLicença,
				individualidade,
				imgCapaUrl,
				imgPerfilUrl,
				imgRankingUrl,
			)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro do usuário! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function login(req, res) {
	var email = req.body.email;
	var senha = req.body.senha;

	if (email == undefined) {
		res.status(400).send("O email está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("O senha está undefined!");
	} else {
		usuariosModel
			.login(email, senha)
			.then(function (resultado) {
				console.log(`\nResultados encontrados: ${resultado.length}`);
				console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

				if (resultado.length == 0) {
					res.status(403).send("Dados não encontrados");
				} else {
					console.log(resultado);
					console.log(resultado);
					res.json(resultado);
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

function listarIdsUsuarios(req, res) {
	usuariosModel
		.listarIdsUsuarios()
		.then(function (resultado) {
			console.log(`\nResultados encontrados: ${resultado.length}`);
			console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

			if (resultado.length == 0) {
				res.status(403).send("Dados não encontrados");
			} else {
				console.log(resultado);
				console.log(resultado);
				res.json(resultado);
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"\nHouve um erro ao realizar o listarIdsUsuarios! Erro: ",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function simularNotas(req, res) {
	const heroisId = req.body.heroisId;
	const comunsId = req.body.comunsId;

	usuariosModel
		.simularNotas(heroisId, comunsId)
		.then(function (resultado) {
			console.log(resultado);
			console.log(resultado);
			res.json(resultado);
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"\nHouve um erro ao realizar o simularNotas! Erro: ",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function listarDadosHerois(req, res) {
	usuariosModel
		.listarDadosHerois()
		.then(function (resultado) {
			console.log(`\nResultados encontrados: ${resultado.length}`);
			console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

			if (resultado.length == 0) {
				res.status(403).send("Dados não encontrados");
			} else {
				console.log(resultado);
				console.log(resultado);
				res.json(resultado);
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"\nHouve um erro ao realizar o listarDadosHerois! Erro: ",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function carregarDados(req, res) {
	const idUsuario = req.body.idUsuario;
	usuariosModel
		.carregarDados(idUsuario)
		.then(function (resultado) {
			console.log(`\nResultados encontrados: ${resultado.length}`);
			console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

			if (resultado.length == 0) {
				res.status(403).send("Dados não encontrados");
			} else {
				console.log(resultado);
				console.log(resultado);
				res.json(resultado);
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"\nHouve um erro ao realizar o carregarDados! Erro: ",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function atualizarUser(req, res) {
	const nome = req.body.nome;
	const sobrenome = req.body.sobrenome;
	const email = req.body.email;
	const senha = req.body.senha;
	const codinome = req.body.codinome;
	const individualidade = req.body.individualidade;
	const imgCapaUrl = req.body.imgCapaUrl;
	const imgPerfilUrl = req.body.imgPerfilUrl;
	const imgRankingUrl = req.body.imgRankingUrl;
	const idUser = req.body.idUser;

	usuariosModel
		.atualizarUser(
			nome,
			sobrenome,
			email,
			senha,
			codinome,
			individualidade,
			imgCapaUrl,
			imgPerfilUrl,
			imgRankingUrl,
			idUser,
		)
		.then(function (resultado) {
			console.log(`\nResultados encontrados: ${resultado.length}`);
			console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

			if (resultado.length == 0) {
				res.status(403).send("Dados não encontrados");
			} else {
				console.log(resultado);
				console.log(resultado);
				res.json(resultado);
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"\nHouve um erro ao realizar o atualizarUser! Erro: ",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

module.exports = {
	cadastrarUser,
	login,
	listarIdsUsuarios,
	simularNotas,
	listarDadosHerois,
	carregarDados,
	atualizarUser,
};
