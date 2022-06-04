var database = require("../database/config");

function avaliar(fkHeroi, nota, fkComum) {
	const instrucaoSql = `
        INSERT INTO avaliação (fkComum, fkHeroi, nota) VALUES
        ('${fkComum}', '${fkHeroi}', '${nota}');
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = { avaliar };
