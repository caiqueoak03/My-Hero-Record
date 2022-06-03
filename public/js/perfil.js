function carregarProfile() {
	const imgPerfilUrl = sessionStorage.imgPerfilUrl;
	const imgCapaUrl = sessionStorage.imgCapaUrl;

	if (imgPerfilUrl != "undefined") {
		profile_pic.src = imgPerfilUrl + "";
	} else {
		profile_pic.src = "../../images/default_profile_pic.svg";
	}

	if (imgCapaUrl != "undefined") {
		profile_container.background =
			"url(../images/default_profile_wallpaper.webp)";
	} else {
		profile_container.background = `url(${imgCapaUrl})`;
	}
	profile_name.innerHTML = sessionStorage.nome;
}

function showBoxRegistro() {
	const boxAtivo = registros_wrapper.style.display == "flex";

	if (boxAtivo) {
		registros_wrapper.style.display = "none";
	} else {
		registros_wrapper.style.display = "flex";
	}
}

function cadastrarRegistro() {}
