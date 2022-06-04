var database = require("../database/config");

function cadastrarOcorrencia(titulo, descricao, capaUrl, data, idUser) {
	const instrucaoSql = `
        INSERT INTO ocorrencia (titulo, descrição, imgCapaURL, dtOcorrencia, fkHeroi) VALUES
        ('${titulo}', '${descricao}', '${capaUrl}', '${data}', '${idUser}');
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function carregarOcorrencias(idUser) {
	const instrucaoSql = `
        SELECT *, DATE_FORMAT(dtOcorrencia, "%d/%m/%Y") AS dataBR, DATE_FORMAT(dtOcorrencia, "%Y-%m-%d") AS dataEN FROM ocorrencia WHERE fkheroi = ${idUser};
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function editarOcorrencia(idOcorrencia, titulo, descricao, capaUrl, data) {
	const instrucaoSql = `
			UPDATE ocorrencia SET titulo = '${titulo}' WHERE idOcorrencia = '${idOcorrencia}';
			UPDATE ocorrencia SET descrição = '${descricao}' WHERE idOcorrencia = '${idOcorrencia}';
			UPDATE ocorrencia SET imgCapaURL = '${capaUrl}' WHERE idOcorrencia = '${idOcorrencia}';
			UPDATE ocorrencia SET dtocorrencia = '${data}' WHERE idOcorrencia = '${idOcorrencia}';
		`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function excluirOcorrencia(idOcorrencia) {
	const instrucaoSql = `
        DELETE FROM ocorrencia WHERE idOcorrencia = ${idOcorrencia};
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function carregarManchetes() {
	const instrucaoSql = `
	SELECT titulo, descrição, ocorrencia.imgCapaURL, nota FROM usuario JOIN avaliação ON idUsuario = avaliação.fkHeroi 
		JOIN ocorrencia ON idUsuario = ocorrencia.fkHeroi 
			WHERE YEARWEEK(ocorrencia.dtOcorrencia, 1) = YEARWEEK(CURDATE(), 1) ORDER BY rand() LIMIT 4;
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	cadastrarOcorrencia,
	carregarOcorrencias,
	editarOcorrencia,
	excluirOcorrencia,
	carregarManchetes,
};
