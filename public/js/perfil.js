function carregarProfile() {
	const imgPerfilUrl = sessionStorage.imgPerfilUrl;
	const imgCapaUrl = sessionStorage.imgCapaUrl;

	if (imgPerfilUrl != "undefined") {
		profile_pic.src = imgPerfilUrl + "";
	} else {
		profile_pic.src = "../../images/default_profile_pic.svg";
	}

	if (imgCapaUrl != "undefined") {
		profile_container.style.backgroundImage = `url(${imgCapaUrl})`;
	} else {
		profile_container.style.backgroundImage =
			"url('../../images/default_profile_wallpaper.webp')";
	}
	profile_name.innerHTML = sessionStorage.nome;
}

var dadosOcorrencias;

function showBoxRegistro() {
	const boxAtivo = registros_wrapper.style.display == "flex";

	if (boxAtivo) {
		registros_wrapper.style.display = "none";
	} else {
		registros_wrapper.style.display = "flex";
	}
}

function alterarBoxOcorrencia(editar, idOcorrencia) {
	showBoxRegistro();

	if (editar) {
		// EDITAR OCORRÊNCIA
		let ocorrenciaIndex = dadosOcorrencias.findIndex((dados) => {
			return dados.idOcorrencia == idOcorrencia;
		});

		ocorrencia_h3.innerHTML = "Altere sua ocorrência";
		in_titulo.value = dadosOcorrencias[ocorrenciaIndex].titulo;
		in_descricao.value = dadosOcorrencias[ocorrenciaIndex].descrição;
		in_capaUrl.value = dadosOcorrencias[ocorrenciaIndex].imgCapaURL;
		in_data.value = dadosOcorrencias[ocorrenciaIndex].dataEN;

		check_btn.onclick = () =>
			editarOcorrencia(
				idOcorrencia,
				in_titulo.value,
				in_descricao.value,
				in_capaUrl.value,
				in_data.value,
			);
	} else {
		// CADASTRAR OCORRÊNCIA
		ocorrencia_h3.innerHTML = "Cadastre sua ocorrência";
		in_titulo.value = "";
		in_descricao.value = "";
		in_capaUrl.value = "";
		in_data.value = "";
		check_btn.onclick = () => cadastrarOcorrencia();
	}
}

var idOcorrenciaDeletar;

function associarIdDeletarBox(idOcorrencia) {
	let boxAtivo = deletar_box_wrapper.style.display == "flex";

	if (boxAtivo) {
		deletar_box_wrapper.style.display = "none";
		idOcorrenciaDeletar = ``;
	} else {
		deletar_box_wrapper.style.display = "flex";
		idOcorrenciaDeletar = `${idOcorrencia}`;
	}
}

function carregarOcorrencias() {
	fetch("/ocorrencias/carregarOcorrencias", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idUser: sessionStorage.idUser,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO carregarOcorrencias()!");

			if (resposta.ok) {
				console.log(resposta);

				registros_list.innerHTML = "";

				resposta.json().then((json) => {
					dadosOcorrencias = json;

					for (let i = 0; i < json.length; i++) {
						if (json[i].descrição.length >= 140) {
							var descrição = json[i].descrição.slice(0, 138) + "...";
						} else {
							var descrição = json[i].descrição;
						}

						if (json[i].titulo.length >= 35) {
							var titulo = json[i].titulo.slice(0, 20) + "...";
						} else {
							var titulo = json[i].titulo;
						}

						registros_list.innerHTML += `
						<li style='background-image: url("${json[i].imgCapaURL}");'>
							<div class="wrapper-registro"></div>
							<span class='data'>${json[i].dataBR}</span>
							<i onclick='alterarBoxOcorrencia(true, ${json[i].idOcorrencia})' class="fa-solid fa-pen pen"></i>
							<i onclick='associarIdDeletarBox(${json[i].idOcorrencia})' class="fa-solid fa-trash-can trash-can"></i>
							<h3 id="titulo_registro">${titulo}</h3>
							<p id="descricao_registro">
							${descrição}
							</p>
						</li>
						`;
					}
				});
			} else {
				console.log("Houve um erro ao tentar realizar o carregarOcorrencias!");

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

let titulo;
let descricao;
let capaUrl;
let data;

function validar() {
	let alerta = "";

	titulo = in_titulo.value;
	descricao = in_descricao.value;
	capaUrl = in_capaUrl.value;
	data = in_data.value;

	// VALIDAÇÃO
	if (titulo == "" && descricao == "" && capaUrl == "" && data == "") {
		alert("Preencha todos os campos");
		return;
	}

	if (titulo == "") {
		alerta += "*Coloque um título para a ocorrência\n";
	} else if (titulo.length <= 3) {
		alerta += "*Titulo muito curto! Mínimo de 4 caracteres\n";
	}

	if (descricao == "") {
		alerta += "*Coloque uma descrição para a ocorrência\n";
	} else if (descricao.length < 100) {
		alerta += "*Descrição muito curta! Mínimo de 100 caracteres\n";
	}

	if (capaUrl == "") {
		alerta += "*Coloque uma capa para sua ocorrência\n";
	}

	if (data == "") {
		alerta += "*Coloque a data da ocorrência\n";
	}

	if (alerta != "") {
		alert(alerta);
		return true;
	}
}

function cadastrarOcorrencia() {
	if (validar()) {
		return;
	}
	fetch("/ocorrencias/cadastrarOcorrencia", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			titulo,
			descricao,
			capaUrl,
			data,
			idUser: sessionStorage.idUser,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO cadastrarOcorrencia()!");

			if (resposta.ok) {
				console.log(resposta);

				showBoxRegistro();
				carregarOcorrencias();
			} else {
				console.log("Houve um erro ao tentar realizar o cadastrarOcorrencia!");

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

function editarOcorrencia(idOcorrencia, titulo, descricao, capaUrl, data) {
	if (validar()) {
		return;
	}
	fetch("/ocorrencias/editarOcorrencia", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idOcorrencia,
			titulo,
			descricao,
			capaUrl,
			data,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO editarOcorrencia()!");

			if (resposta.ok) {
				console.log(resposta);

				alterarBoxOcorrencia(false);
				carregarOcorrencias();
			} else {
				console.log("Houve um erro ao tentar realizar o editarOcorrencia!");

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
function excluirOcorrencia() {
	fetch("/ocorrencias/excluirOcorrencia", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idOcorrencia: idOcorrenciaDeletar,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO excluirOcorrencia()!");

			if (resposta.ok) {
				console.log(resposta);

				associarIdDeletarBox();
				carregarOcorrencias();
			} else {
				console.log("Houve um erro ao tentar realizar o excluirOcorrencia!");

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
