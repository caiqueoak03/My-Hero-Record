var manchetesDestaque = [
	// {
	// 	img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/10/My-Hero-Academia-Edgeshot-Attacked.jpg?q=50&fit=crop&w=1920&dpr=1.5",
	// 	titulo: "Ataque a base dos vilões",
	// 	descricao:
	// 		"O herói número 4, Edgeshot fez um ataque surpresa à base do grupo de vilões conhecida como Black Hand. O herói informou ao noticiário que através de uma investigação conjunta com a polícia, descobriu o paradeiro de um dos membros do grupo que ficava próximo a uma famosa rua de Nakano.",
	// },
	// {
	// 	img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/08/Snipe-Holding-His-Pistol-At-USJ.jpg?q=50&fit=crop&w=1914&dpr=1.5",
	// 	titulo: "Assalto de vilões a loja de conveniência",
	// 	descricao:
	// 		"O famoso herói Kamui Woods salva o dia mais uma vez. Em um dia de patrulha comum ele encontra vilões assaltando uma loja de conveniências e rapidamente consegue detê-los com sua habilidade de transformar seus braços em raízes de árvore, prendendo-os.",
	// },
	// {
	// 	img: "https://c4.wallpaperflare.com/wallpaper/74/476/56/anime-my-hero-academia-hawks-boku-no-hero-academia-hd-wallpaper-preview.jpg",
	// 	titulo: "Assalto de vilões a loja de conveniência",
	// 	descricao:
	// 		"O famoso herói Kamui Woods salva o dia mais uma vez. Em um dia de patrulha comum ele encontra vilões assaltando uma loja de conveniências e rapidamente consegue detê-los com sua habilidade de transformar seus braços em raízes de árvore, prendendo-os. O famoso herói Kamui Woods salva o dia mais uma vez. Em um dia de patrulha comum ele encontra vilões assaltando uma loja de conveniências e rapidamente consegue detê-los com sua habilidade de transformar seus braços em raízes de árvore, prendendo-os.",
	// },
];

var ultimasNoticias = [
	// {
	// 	img: "https://s3.us-east-1.amazonaws.com/dexerto-assets-production-cbbdf288/uploads/2020/05/23213020/my-hero-academia-mt-lady-cosplayer-steps-on-enemies-logo.png",
	// 	titulo: "Mt. Lady derrota vilão na linha de trem",
	// 	descricao:
	// 		"A heroína Mt. Lady que tem a individualidade de aumentar seu tamanho em até 50 vezes derrotou um vilão na linha de trem que liga as cidades de Nakano e Tsushima. O vilão estava impedindo a circulação dos trens através de sua individualidade de crescer, até que a heroína chegou golpeando-o quando estava distraído pelo herói Kamui Woods.",
	// },
	// {
	// 	img: "https://i.pinimg.com/originals/02/57/88/02578845a9f80d1315f117eb36f1c691.jpg",
	// 	titulo: "Mt. Lady derrota vilão na linha de trem",
	// 	descricao:
	// 		"A heroína Mt. Lady que tem a individualidade de aumentar seu tamanho em até 50 vezes derrotou um vilão na linha de trem que liga as cidades de Nakano e Tsushima. O vilão estava impedindo a circulação dos trens através de sua individualidade de crescer, até que a heroína chegou golpeando-o quando estava distraído pelo herói Kamui Woods.",
	// },
	// {
	// 	img: "https://wallpapercave.com/wp/wp8293568.png",
	// 	titulo: "Mt. Lady derrota vilão na linha de trem",
	// 	descricao:
	// 		"A heroína Mt. Lady que tem a individualidade de aumentar seu tamanho em até 50 vezes derrotou um vilão na linha de trem que liga as cidades de Nakano e Tsushima. O vilão estava impedindo a circulação dos trens através de sua individualidade de crescer, até que a heroína chegou golpeando-o quando estava distraído pelo herói Kamui Woods.",
	// },
];

function carregarManchetes() {
	fetch("/ocorrencias/carregarManchetes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO carregarManchetes()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					console.log(json);
					console.log(JSON.stringify(json));

					manchetesDestaque = [];
					ultimasNoticias = [];

					for (let i = 0; i < json.length; i++) {
						if (json[i].nota >= 8) {
							manchetesDestaque.push({
								img: `${json[i].imgCapaURL.toString()}`,
								titulo: `${json[i].titulo.toString()}`,
								descricao: `${json[i].descrição.toString()}`,
							});
						} else {
							ultimasNoticias.push({
								img: `${json[i].imgCapaURL.toString()}`,
								titulo: `${json[i].titulo.toString()}`,
								descricao: `${json[i].descrição.toString()}`,
							});
						}
					}
					renderizarNoticias();
					mudarManchete();
				});
			} else {
				console.log("Houve um erro ao tentar realizar o carregarManchetes!");

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

function renderizarNoticias() {
	registros_container.innerHTML = `
	<h3 class='registros-title'>Últimas Notícias!</h3>
	`;

	for (let i = 0; i < 3; i++) {
		registros_container.innerHTML += `
			<section class="registros-items">
				<img
					src="${ultimasNoticias[i].img}"
					alt=""
				/>
				<div class="registros-text-container">
					<h1>
					${ultimasNoticias[i].titulo}
					</h1>
					<p>
					${ultimasNoticias[i].descricao}
					</p>
				</div>
			</section>
		`;
	}
}

var counter = 0;

function mudarManchete(lado) {
	if (lado == "esquerda" && counter > 0) {
		counter--;
	} else if (lado == "direita" && counter < 3) {
		counter++;
	} else if (lado == "direita" && counter == 3) {
		counter = 0;
	} else if (lado == "esquerda" && counter == 0) {
		counter = 3;
	} else if (lado == 0) {
		counter = 0;
	} else if (lado == 1) {
		counter = 1;
	} else if (lado == 2) {
		counter = 2;
	} else if (lado == 3) {
		counter = 3;
	}

	for (let i = 0; i < 4; i++) {
		document.querySelectorAll(".carrossel-circles")[i].style.backgroundColor =
			"";
	}

	manchete_img.src = manchetesDestaque[counter].img;
	titulo_manchete.innerHTML = manchetesDestaque[counter].titulo;
	descricao_manchete.innerHTML = manchetesDestaque[counter].descricao;
	document.querySelectorAll(".carrossel-circles")[
		counter
	].style.backgroundColor = "#31d9a5";
}

function tirarAnimação() {
	document.querySelectorAll(".setas")[0].style.animation = "none";
	document.querySelectorAll(".setas")[1].style.animation = "none";
}

function colocarAnimação() {
	document.querySelectorAll(".setas")[0].style.animation =
		"setaAnimationLeft infinite 0.3s alternate-reverse";
	document.querySelectorAll(".setas")[1].style.animation =
		"setaAnimationRight infinite 0.3s alternate-reverse";
}
