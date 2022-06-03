let comunsId = [];
let heroisId = [];
let heroisData = [];

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
						listarDadosHerois();
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

					listarDadosHerois();
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

	return false;
}

function listarDadosHerois() {
	fetch("/usuarios/listarDadosHerois", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO listarDadosHerois()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					console.log(json);
					console.log("LISTAR DADOS HEROIS:::::" + JSON.stringify(json));

					for (let i = 0; i < json.length; i++) {
						heroisData.push(json[i]);
					}

					criarHerois();
				});
			} else {
				console.log("Houve um erro ao tentar realizar o listarDadosHerois!");

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

function criarHerois() {
	for (let i = 0; i < heroisData.length; i++) {
		heroes_cards_container.innerHTML += `
		<section id='heroi${i}id' class="hero-card">
			<p class="hero-name-container">
			<span id="heroi${i}ranking">Nº ${
			i + 1
		}</span>	<span id="heroi${i}nome" class="hero_name">${heroisData[
			i
		].codinome.toLowerCase()}</span></p>
			<img src="${heroisData[i].imgRankingURL}" alt="" class="hero-img" id="hero_img">
			<div class="bottom-card-container">
				<div class="select-container">
					<select name="" id="in_nota">
						<option value=""></option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						</select>
						<button onclick="avaliar()" id='avaliar_btn'>Avaliar</button>
						</div>
						<p id='heroi${i}nota'>Nota: ${heroisData[i].notaHeroi}</p>
						</div>
						</section>
		`;
	}

	guardarHerois();
}

let heroCards = [];

function guardarHerois() {
	const qtdHeros = document.querySelectorAll(".hero-card").length;

	for (let i = 0; i < qtdHeros; i++) {
		heroCards.push(document.querySelectorAll(".hero-card")[i]);
	}

	pesquisarHerois();
}

function pesquisarHerois() {
	let heroisFiltrados = [];

	let nomeHeroiRegex = new RegExp(in_heroName.value, "gi");
	const numRanking = in_ranking.value;
	const notaPesquisa = select_nota_pesquisa.value;
	const ordemItem = ordem_item.value;
	const topOrdem = tipo_ordem.value;

	for (let i = 0; i < heroCards.length; i++) {
		let nomeHeroi = heroCards[i].childNodes[1].childNodes[3].innerHTML;
		let numRanking =
			heroCards[i].childNodes[1].childNodes[1].innerHTML.slice(3);
		let notaPesquisa =
			heroCards[i].childNodes[5].childNodes[3].innerHTML.slice(6);

		if (nomeHeroiRegex.test(nomeHeroi)) {
			console.log(nomeHeroi + " " + nomeHeroiRegex.test(nomeHeroi));
			heroisFiltrados.push(heroCards[i]);
		} else if (in_heroName.value == "") {
			heroisFiltrados.push(heroCards[i]);
		}
	}

	heroes_cards_container.innerHTML = "";

	for (let i = 0; i < heroisFiltrados.length; i++) {
		heroes_cards_container.append(heroisFiltrados[i]);
	}
}

function avaliar() {}
