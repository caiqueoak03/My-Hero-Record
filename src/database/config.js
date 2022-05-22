var mysql = require("mysql2");

var mySqlConfig = {
	host: "localhost",
	user: "root",
	database: "myHeroRecord",
	password: "89754868",
	multipleStatements: true,
};

function executar(instrucao) {
	return new Promise(function (resolve, reject) {
		var conexao = mysql.createConnection(mySqlConfig);
		conexao.connect();
		conexao.query(instrucao, function (erro, resultados) {
			conexao.end();
			if (erro) {
				reject(erro);
			}
			console.log(resultados);
			resolve(resultados);
		});
		conexao.on("error", function (erro) {
			return "ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage;
		});
	});
}

module.exports = {
	executar,
};
