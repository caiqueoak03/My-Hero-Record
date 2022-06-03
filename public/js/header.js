function mostrarDropDown() {
	const dropdownAtivo = dropdown.style.height == "auto";

	if (dropdownAtivo) {
		dropdown.style.height = "0";
		dropdown.style.padding = "0";
		dropdown.style.overflow = "hidden";
		dropdown.style.fontSize = "0";
	} else {
		dropdown.style.height = "auto";
		dropdown.style.padding = "15px 0";
		dropdown.style.overflow = "visible";
		dropdown.style.fontSize = "1.2rem";
	}
}

function mostrarWrapper() {
	const wrapperAtivo = wrapper.style.display == "flex";

	if (wrapperAtivo) {
		wrapper.style.display = "none";
	} else {
		wrapper.style.display = "flex";
	}
}

function carregarNav() {
	// Wrapper de loading
	setTimeout(() => {
		wrapperLoading.style.display = "none";
		document.querySelector("body").style.overflow = "visible";
	}, 0);

	const userLogado = sessionStorage.userLogado;
	const perfil = sessionStorage.perfil;

	if (userLogado == "true") {
		document.querySelector(".cadastro-list").style.display = "none";
		document.querySelector("#perfil_container").style.display = "flex";

		if (perfil == "heroi") {
			perfil_option.style.display = "flex";
			nomeUser.innerHTML = `Olá, ${sessionStorage.nome}`;
		} else {
			nomeUser.innerHTML = `Olá, ${sessionStorage.nome}`;
		}
	} else {
		document.querySelector(".cadastro-list").style.display = "flex";
		document.querySelector("#perfil_container").style.display = "none";
	}
}

function deslogar(paginaAtual) {
	sessionStorage.userLogado = false;
	sessionStorage.clear();

	carregarNav();

	if (paginaAtual == "index") {
		window.location = "index.html";
	} else if (paginaAtual == "perfil") {
		window.location = "../../index.html";
	} else {
		window.location = "../index.html";
	}
}
