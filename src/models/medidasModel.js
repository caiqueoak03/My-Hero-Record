var database = require("../database/config");

function avaliar(fkHeroi, nota, fkComum) {
	var instrucaoSql = `
        INSERT INTO avaliação (fkComum, fkHeroi, nota) VALUES
        ('${fkComum}', '${fkHeroi}', '${nota}');
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function pegarOcorrenciasAbsolutas(parametro, idHeroi) {
	if (parametro == "semana") {
		var instrucaoSql = `
            SELECT count(idOcorrencia) AS ocorrencias FROM usuario JOIN ocorrencia ON idUsuario = fkHeroi
                WHERE idUsuario = ${idHeroi} AND WEEK(dtOcorrencia, 1) = WEEK(now(), 1);
        `;
	} else if (parametro == "mes") {
		var instrucaoSql = `
            SELECT count(idOcorrencia) AS ocorrencias FROM usuario JOIN ocorrencia ON idUsuario = fkHeroi
                WHERE idUsuario = ${idHeroi} AND MONTH(dtOcorrencia) = MONTH(now());
        `;
	} else if (parametro == "ano") {
		var instrucaoSql = `
            SELECT count(idOcorrencia) AS ocorrencias FROM usuario JOIN ocorrencia ON idUsuario = fkHeroi
                WHERE idUsuario = ${idHeroi} AND YEAR(dtOcorrencia) = YEAR(now());
        `;
	}
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function pegarOcorrenciasMedias(parametro, idHeroi) {
	if (parametro == "semana") {
		var instrucaoSql = `
        SELECT truncate(avg(ocorrencias), 2) AS ocorrencias FROM 
            (SELECT count(idOcorrencia) AS ocorrencias FROM usuario JOIN ocorrencia ON idUsuario = fkHeroi
                WHERE idUsuario = ${idHeroi} GROUP BY WEEK(dtOcorrencia)) average;
        `;
	} else if (parametro == "mes") {
		var instrucaoSql = `
        SELECT truncate(avg(ocorrencias), 2) AS ocorrencias FROM 
            (SELECT count(idOcorrencia) AS ocorrencias FROM usuario JOIN ocorrencia ON idUsuario = fkHeroi
                WHERE idUsuario = ${idHeroi} GROUP BY MONTH(dtOcorrencia)) average;
        `;
	} else if (parametro == "ano") {
		var instrucaoSql = `
        SELECT truncate(avg(ocorrencias), 2) AS ocorrencias FROM 
            (SELECT count(idOcorrencia) AS ocorrencias FROM usuario JOIN ocorrencia ON idUsuario = fkHeroi
                WHERE idUsuario = ${idHeroi} GROUP BY YEAR(dtOcorrencia)) average;
        `;
	}
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function pegarOcorrenciasDia(dataOcorrencia, idHeroi) {
	var instrucaoSql = `
        SELECT count(idOcorrencia) AS ocorrencias FROM usuario JOIN ocorrencia ON idUsuario = fkHeroi
            WHERE idUsuario = ${idHeroi} AND dtOcorrencia = '${dataOcorrencia}';
        `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function pegarDadosGraficos(idHeroi) {
	var instrucaoSql = `
	SELECT time(dtNota) as horario, nota
		FROM avaliação JOIN usuario ON idUsuario = fkHeroi
			WHERE idUsuario = ${idHeroi} ORDER BY idAvaliação desc LIMIT 6;
	SELECT truncate(avg(nota), 2) as avgNotaSemana 
		FROM avaliação JOIN usuario ON idUsuario = fkHeroi
			WHERE idUsuario = ${idHeroi} AND MONTH(dtNota) = MONTH(now()) 
				GROUP BY WEEK(dtNota, 1) ORDER BY WEEK(dtNota, 1) LIMIT 4;
	`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	avaliar,
	pegarOcorrenciasAbsolutas,
	pegarOcorrenciasMedias,
	pegarOcorrenciasDia,
	pegarDadosGraficos,
};
