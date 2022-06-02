function mostrarDropDown() {
	const dropdownAtivo = dropdown.style.height == "100px";

	if (dropdownAtivo) {
		dropdown.style.height = "0px";
		dropdown.style.overflow = "hidden";
		dropdown.style.fontSize = "0";
	} else {
		dropdown.style.height = "100px";
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

	if (userLogado == "true") {
		document.querySelector(".cadastro-list").style.display = "none";
		document.querySelector("#perfil_containter").style.display = "flex";
	} else {
		document.querySelector(".cadastro-list").style.display = "flex";
		document.querySelector("#perfil_containter").style.display = "none";
	}
}

function deslogar(paginaAtual) {
	sessionStorage.userLogado = false;
	carregarNav();
	if (paginaAtual == "index") {
		window.location = "index.html";
	} else {
		window.location = "../index.html";
	}
	sessionStorage.clear;
}
