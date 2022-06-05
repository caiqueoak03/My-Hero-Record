var herois = require("../js/herois");

let horarios = [];
let avaliações = [];

let semanas = [];
let avgAvaliaçõesSemana = [];

var primeiroRender = true;

var interval;

var intervalo = 3 * 1000;

herois.simularNotas()

function pegarDados() {
	var pegar = () =>
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

						for (var i = 0; i < json[0].length; i++) {
							temperaturaValuesHora.unshift(json[0][i].temperatura);
							umidadeValuesHora.unshift(json[0][i].umidade);
							labelsHora.unshift(json[0][i].tempoDado);
						}

						for (var i = 0; i < json[1].length; i++) {
							temperaturaValuesSetor.push(json[1][i].avgTemp);
							umidadeValuesSetor.push(json[1][i].avgUmid);
							labelsSetor.push(json[1][i].nome);
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

	clearInterval(interval);

	interval = setInterval(() => {
		pegar();
	}, intervalo);

	pegar();
}

// Renderiza o gráfico usando o chartJS
function renderizarGraficos() {
	// Caso não seja a primeira renderização, destruir os gráficos para recriá-los abaixo
	if (primeiroRender == false) {
		graficoRealTime.destroy();
		graficoAvgSemana.destroy();
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

	// Avg de avaliações por semana
	const dataAvgSemana = {
		labels: semanas,
		datasets: [
			{
				label: "Média de Avaliações por Semana",
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

	primeiroRender = false;
}
