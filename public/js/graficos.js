let horarios = [];
let avaliações = [];

let heroisId = [];
let comunsId = [];

let semanas = [];
let avgAvaliaçõesSemana = [];

var primeiroRender = true;

const meses = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro",
];

let mesAtual = meses[new Date().toJSON().slice(6, 7) - 1];

listarIdsUsuarios();

function listarIdsUsuarios() {
	fetch("/usuarios/listarIdsUsuarios", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO listarIdsUsuarios()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					console.log(json);
					console.log(JSON.stringify(json));

					for (let i = 0; i < json.length; i++) {
						if (json[i].perfil == "heroi") {
							heroisId.push(json[i].idUsuario);
						} else {
							comunsId.push(json[i].idUsuario);
						}
					}

					if (heroisId == "") {
						alert("nenhum heroi cadastrado");
					} else {
						simularNotas();
					}
				});
			} else {
				console.log("Houve um erro ao tentar realizar o listarIdsUsuarios!");

				resposta.text().then((texto) => {
					console.error(texto);
				});
			}
		})
		.catch(function (erro) {
			console.log(erro);
		});

	return false;
}

function simularNotas() {
	let simular = () =>
		fetch("/usuarios/simularNotas", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				heroisId,
				comunsId,
			}),
		})
			.then(function (resposta) {
				console.log("ESTOU NO THEN DO simularNotas()!");

				if (resposta.ok) {
					console.log(resposta);

					resposta.json().then((json) => {
						console.log(json);
						console.log(JSON.stringify(json));

						pegarDados();
					});
				} else {
					console.log("Houve um erro ao tentar realizar o simularNotas!");

					resposta.text().then((texto) => {
						console.error(texto);
					});
				}
			})
			.catch(function (erro) {
				console.log(erro);
			});

	simular();
	clearInterval(simular);

	setInterval(simular, 3000);
}

function pegarDados() {
	fetch("/medidas/pegarDadosGraficos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idHeroi: sessionStorage.idUser,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO pegarDadosGraficos()!");

			if (resposta.ok) {
				resposta.json().then((json) => {
					console.log(json);
					console.log("json dados: " + JSON.stringify(json));

					// RESET
					horarios = [];
					avaliações = [];

					semanas = [];
					avgAvaliaçõesSemana = [];

					// Avaliações em tempo real
					for (let i = 0; i < json[0].length; i++) {
						horarios.push(json[0][i].horario);
						avaliações.push(json[0][i].nota);
					}

					// Avaliações por semana
					if (primeiroRender) {
						for (let i = 0; i < json[1].length; i++) {
							semanas.push(`${i + 1}º Semana`);
							avgAvaliaçõesSemana.push(json[1][i].avgNotaSemana);
						}
					}

					renderizarGraficos();
				});
			} else {
				console.log("Houve um erro ao carregar os dados");

				resposta.text().then((texto) => {
					console.error(texto);
				});
			}
		})
		.catch(function (erro) {
			console.log(erro);
		});
}

// Renderiza o gráfico usando o chartJS
function renderizarGraficos() {
	// Caso não seja a primeira renderização, destruir os gráficos para recriá-los abaixo
	if (primeiroRender == false) {
		graficoRealTime.destroy();
	} else {
		// Avg de avaliações por semana
		const dataAvgSemana = {
			labels: semanas,
			datasets: [
				{
					label: `Média de Avaliações por Semana (${mesAtual})`,
					backgroundColor: "rgb(100,100,255)",
					borderColor: "rgb(100,100,255)",
					data: avgAvaliaçõesSemana,
				},
			],
		};

		const configAvgSemana = {
			type: "bar",
			data: dataAvgSemana,
			options: {},
		};

		graficoAvgSemana = new Chart(
			document.getElementById("chartPopularity"),
			configAvgSemana,
		);
	}

	// Avaliações real time
	const dataRealTime = {
		labels: horarios,
		datasets: [
			{
				label: "Avaliações em Tempo Real",
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgb(255, 99, 132)",
				data: avaliações,
			},
		],
	};

	const configRealTime = {
		type: "line",
		data: dataRealTime,
		options: {},
	};

	graficoRealTime = new Chart(
		document.getElementById("chartRealTime"),
		configRealTime,
	);

	primeiroRender = false;
}
