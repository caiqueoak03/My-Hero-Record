// Setando default value para o date input
in_dataOcorrencias.value = new Date().toJSON().slice(0, 10);

// PRIMEIRA RENDERIZAÇÃO DAS MÉTRICAS
pegarOcorrenciasAbsolutas();
pegarOcorrenciasMedias();
pegarOcorrenciasDia();

function pegarOcorrenciasAbsolutas() {
	fetch("/medidas/pegarOcorrenciasAbsolutas", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			parametro: ocorrencias_select.value,
			idHeroi: sessionStorage.idUser,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO pegarOcorrenciasAbsolutas()!");

			if (resposta.ok) {
				resposta.json().then((json) => {
					console.log(json);
					console.log("json dados: " + JSON.stringify(json));

					numOcorrenciasAbsolutas.innerHTML = json[0].ocorrencias;
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

function pegarOcorrenciasMedias() {
	fetch("/medidas/pegarOcorrenciasMedias", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			parametro: mediaOcorrencias_select.value,
			idHeroi: sessionStorage.idUser,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO pegarOcorrenciasMedias()!");

			if (resposta.ok) {
				resposta.json().then((json) => {
					console.log(json);
					console.log("json dados: " + JSON.stringify(json));

					numOcorrenciasMedias.innerHTML = json[0].ocorrencias;
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

function pegarOcorrenciasDia() {
	fetch("/medidas/pegarOcorrenciasDia", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			dataOcorrencia: in_dataOcorrencias.value,
			idHeroi: sessionStorage.idUser,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO pegarOcorrenciasDia()!");

			if (resposta.ok) {
				resposta.json().then((json) => {
					console.log(json);
					console.log("json dados: " + JSON.stringify(json));

					numOcorrenciasDia.innerHTML = json[0].ocorrencias;
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
