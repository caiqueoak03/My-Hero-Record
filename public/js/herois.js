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
						simularNotas(listarDadosHerois);
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

function simularNotas(callback = false) {
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

						if (callback) {
							callback();
						}
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

					heroisData = [];

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
	heroes_cards_container.innerHTML = "";

	for (let i = 0; i < heroisData.length; i++) {
		heroes_cards_container.innerHTML += `
		<section id='heroi${i}id' class="hero-card">
			<p class="hero-name-container">
				<span id="heroi${i}ranking">Nº ${i + 1}</span>	
				<span id="heroi${i}nome" class="hero_name">
				${heroisData[i].codinome.toLowerCase()}
				</span>
			</p>
			<img src="${heroisData[i].imgRankingURL}" alt="" class="hero-img" id="hero_img">
			<div class="bottom-card-container">
				<div class="select-container">
					<select name="" id="in_nota${i}">
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
					<button 
						onclick="avaliar('${heroisData[i].idUsuario}', in_nota${i}.value)" 
						id='avaliar_btn'>Avaliar
					</button>
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

	heroCards = [];

	for (let i = 0; i < qtdHeros; i++) {
		heroCards.push(document.querySelectorAll(".hero-card")[i]);
	}

	pesquisarHerois();
}

function pesquisarHerois() {
	let heroisFiltrados = [];

	let nomeHeroiIn = in_heroName.value.trim().toLowerCase();
	let numRankingIn = in_ranking.value;
	let notaPesquisaIn = select_nota_pesquisa.value;
	let notaPesquisaMin = notaPesquisaIn.slice(0, 1);
	let notaPesquisaMax = Number(notaPesquisaIn.slice(2, 4));
	let itemOrdem = item_ordem.value;
	let tipoOrdem = tipo_ordem.value;

	for (let i = 0; i < heroCards.length; i++) {
		let nomeHeroi = heroCards[i].childNodes[1].childNodes[3].innerHTML
			.trim()
			.toLowerCase();
		let numRanking =
			heroCards[i].childNodes[1].childNodes[1].innerHTML.slice(3);
		let notaPesquisa = Number(
			heroCards[i].childNodes[5].childNodes[3].innerHTML.slice(6),
		);

		let filtrarNome = !nomeHeroiIn || nomeHeroi.indexOf(nomeHeroiIn) != -1;

		let filtrarRanking = !numRankingIn || numRankingIn == numRanking;
		let filtrarNota =
			!notaPesquisaIn ||
			(notaPesquisa >= notaPesquisaMin && notaPesquisa <= notaPesquisaMax);

		if (filtrarNome && filtrarRanking && filtrarNota) {
			heroisFiltrados.push(heroCards[i]);
		}
	}

	if (itemOrdem == "ranking") {
		if (tipoOrdem == "crescente") {
			heroisFiltrados.sort(
				(heroi1, heroi2) =>
					Number(heroi2.childNodes[1].childNodes[1].innerHTML.trim().slice(3)) -
					Number(heroi1.childNodes[1].childNodes[1].innerHTML.trim().slice(3)),
			);
		}
	} else if (itemOrdem == "nome") {
		heroisFiltrados.sort((heroi1, heroi2) => {
			return heroi2.childNodes[1].childNodes[3].innerHTML
				.trim()
				.localeCompare(heroi1.childNodes[1].childNodes[3].innerHTML.trim());
		});
		if (tipoOrdem == "crescente") {
			heroisFiltrados.reverse();
		}
	}

	heroes_cards_container.innerHTML = "";

	for (let i = 0; i < heroisFiltrados.length; i++) {
		heroes_cards_container.append(heroisFiltrados[i]);
	}
}

function avaliar(fkHeroi, nota) {
	if (!sessionStorage.userLogado) {
		alert("Você precisa estar logado para avaliar!");
		return;
	} else if (nota < 1) {
		alert("Escolha uma nota!");
		return;
	}
	fetch("/medidas/avaliar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			fkHeroi,
			nota,
			fkComum: sessionStorage.idUser,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO avaliar()!");

			if (resposta.ok) {
				console.log(resposta);

				alert("Avaliação enviada!");
			} else {
				console.log("Houve um erro ao tentar avaliar!");
				alert("Houve um erro inesperado!");

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

module.exports = {
	simularNotas,
};
