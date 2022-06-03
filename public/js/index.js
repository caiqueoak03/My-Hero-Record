var counter = 0;
function mudarManchete(lado) {
	var manchetes = {
		0: {
			img: "https://3.bp.blogspot.com/-Id-gwzZmLUI/YTEZrRaRFAI/AAAAAAAAKVE/HhCdtZnkwH45gzvfjZcRScWuhBpZyHoiACPcBGAsYHg/w919/kamui-woods-mha-1-4k-uhdpaper.com-973.0_b-thumbnail.jpg",
			titulo: "Assalto de vilões a loja de conveniência",
			descricao:
				"O famoso herói Kamui Woods salva o dia mais uma vez. Em um dia de patrulha comum ele encontra vilões assaltando uma loja de conveniências e rapidamente consegue detê-los com sua habilidade de transformar seus braços em raízes de árvore, prendendo-os.",
		},
		1: {
			img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/10/My-Hero-Academia-Edgeshot-Attacked.jpg?q=50&fit=crop&w=1920&dpr=1.5",
			titulo: "Ataque a base dos vilões",
			descricao:
				"O herói número 4, Edgeshot fez um ataque surpresa à base do grupo de vilões conhecida como Black Hand. O herói informou ao noticiário que através de uma investigação conjunta com a polícia, descobriu o paradeiro de um dos membros do grupo que ficava próximo a uma famosa rua de Nakano.",
		},
		2: {
			img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/08/Snipe-Holding-His-Pistol-At-USJ.jpg?q=50&fit=crop&w=1914&dpr=1.5",
			titulo: "Assalto de vilões a loja de conveniência",
			descricao:
				"O famoso herói Kamui Woods salva o dia mais uma vez. Em um dia de patrulha comum ele encontra vilões assaltando uma loja de conveniências e rapidamente consegue detê-los com sua habilidade de transformar seus braços em raízes de árvore, prendendo-os.",
		},
		3: {
			img: "https://c4.wallpaperflare.com/wallpaper/74/476/56/anime-my-hero-academia-hawks-boku-no-hero-academia-hd-wallpaper-preview.jpg",
			titulo: "Assalto de vilões a loja de conveniência",
			descricao:
				"O famoso herói Kamui Woods salva o dia mais uma vez. Em um dia de patrulha comum ele encontra vilões assaltando uma loja de conveniências e rapidamente consegue detê-los com sua habilidade de transformar seus braços em raízes de árvore, prendendo-os.",
		},
	};

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

	manchete_img.src = manchetes[counter].img;
	titulo_manchete.innerHTML = manchetes[counter].titulo;
	descricao_manchete.innerHTML = manchetes[counter].descricao;
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
