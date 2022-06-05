var database = require("../database/config");

function cadastrarUser(
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
) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarUser()",
	);

	var instrucao = `
			INSERT INTO usuario VALUES
			(${null}, '${nome}', '${sobrenome}', '${email}', '${senha}', '${perfil}', 
			'${codinome}', '${numLicença}', '${individualidade}', '${imgPerfilUrl}', '${imgCapaUrl}', '${imgRankingUrl}');
			`;

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function login(email, senha) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function login(): ",
		email,
		senha,
	);

	var instrucao = `
			SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
	  `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function listarIdsUsuarios() {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarIdsUsuarios(): ",
	);

	// Fan list
	// var instrucao = `
	// 	SELECT idUsuario, perfil FROM usuario WHERE idUsuario > 3;
	// `;

	// Para simulação
	var instrucao = `
		SELECT idUsuario, perfil FROM usuario;
	`;

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

// Conta quantas inserções foram feitas nos dados
var contador = 1;
// Incrementa na data do dado
var incrementador = 1;

function simularNotas(heroisId, comunsId) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function simularNotas(): ",
		heroisId,
		comunsId,
	);

	var instrucao = `
	  `;

	for (let i = 0; i < heroisId.length; i++) {
		for (let k = 0; k < comunsId.length; k++) {
			let randNota = Math.floor(Math.random() * 10 + 1);

			if (heroisId[i] == 1) {
				randNota = 10;
			} else if (heroisId[i] == 2) {
				randNota = 8.9;
			} else if (heroisId[i] == 3) {
				randNota = 8.1;
			}

			// Insere 10 dados em uma data, depois insere mais 10 dados em outra data e assim por diante
			if (contador == 3) {
				instrucao += `
					ALTER TABLE avaliação MODIFY dtNota DATETIME NOT NULL DEFAULT(DATE_ADD(now(), INTERVAL ${incrementador} day));
					INSERT INTO avaliação (fkComum, fkHeroi, nota) VALUES 
						(${comunsId[k]}, ${heroisId[i]}, ${randNota});
			`;
				incrementador++;
				contador = 0;
			} else {
				instrucao += `
				INSERT INTO avaliação (fkComum, fkHeroi, nota) VALUES 
					(${comunsId[k]}, ${heroisId[i]}, ${randNota});
			`;
				contador++;
			}
		}
	}

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function listarDadosHerois() {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDadosHerois(): ",
	);

	var instrucao = `
	SELECT *, truncate(avg(nota), 2) AS notaHeroi FROM usuario
		JOIN avaliação ON idUsuario = fkHeroi
			WHERE perfil = 'heroi' GROUP BY idUsuario ORDER By notaHeroi DESC;
	`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function carregarDados(idUsuario) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarDados(): ",
	);

	var instrucao = `
			SELECT * FROM usuario WHERE idUsuario = '${idUsuario}';
	  `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function atualizarUser(
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
) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarUser(): ",
	);

	var instrucao = `
		UPDATE usuario SET nome = '${nome}' WHERE idUsuario = '${idUser}' ;
		UPDATE usuario SET sobrenome = '${sobrenome}' WHERE idUsuario = '${idUser}' ;
		UPDATE usuario SET email = '${email}' WHERE idUsuario = '${idUser}' ;
		UPDATE usuario SET senha = '${senha}' WHERE idUsuario = '${idUser}' ;
		UPDATE usuario SET codinome = '${codinome}' WHERE idUsuario = '${idUser}' ;
		UPDATE usuario SET individualidade = '${individualidade}' WHERE idUsuario = '${idUser}' ;
		UPDATE usuario SET imgCapaUrl = '${imgCapaUrl}' WHERE idUsuario = '${idUser}' ;
		UPDATE usuario SET imgPerfilUrl = '${imgPerfilUrl}' WHERE idUsuario = '${idUser}' ;
		UPDATE usuario SET imgRankingUrl = '${imgRankingUrl}' WHERE idUsuario = '${idUser}' ;
	  `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
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
