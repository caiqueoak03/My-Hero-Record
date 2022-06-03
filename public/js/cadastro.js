cadastro_heroi.style.display = "none";

function verificarPerfil() {
	if (perfil_select.value == "heroi") {
		cadastro_heroi.style.display = "flex";
	} else {
		cadastro_heroi.style.display = "none";
	}
}

function validar() {
	let alerta = "";

	const nome = in_nome.value;
	const sobrenome = in_sobrenome.value;
	const email = in_email.value;
	const senha = in_senha.value;
	const confirmarSenha = in_confirmarSenha.value;
	const perfil = perfil_select.value;

	const codinome = in_codinome.value;
	const numLicença = in_numLicença.value;
	const individualidade = in_individualidade.value;
	const imgPerfilUrl = in_imgPerfilUrl.value;
	const imgCapaUrl = in_imgCapaUrl.value;
	const imgRankingUrl = in_imgRankingUrl.value;

	if (
		nome == "" &&
		sobrenome == "" &&
		email == "" &&
		senha == "" &&
		confirmarSenha == ""
	) {
		alert("Preencha todos os campos");
		return;
	}

	if (nome == "") {
		alerta += "*Preencha seu nome\n";
	}

	if (sobrenome == "") {
		alerta += "*Preencha seu sobrenome\n";
	}

	if (email == "") {
		alerta += "*Preencha seu email\n";
	}

	if (senha == "") {
		alerta += "*Preencha seu senha\n";
	}

	if (senha != confirmarSenha) {
		alerta += "*As senhas não são iguais\n";
	}

	if (perfil == "heroi") {
		if (codinome == "") {
			alerta += "*Preencha seu nome de herói\n";
		}

		if (numLicença == "") {
			alerta += "*Preencha o número da sua licença\n";
		} else if (numLicença.length != 11) {
			alerta += "*Número da licença deve ter 11 dígitos\n";
		}

		if (individualidade == "") {
			alerta += "*Descreva sua individualidade\n";
		}

		if (imgRankingUrl == "") {
			alerta += "*É obrigatório colocar uma imagem para o ranking!\n";
		}
	}

	if (alerta != "") {
		alert(alerta);
	} else {
		cadastrarUser(
			nome,
			sobrenome,
			email,
			senha,
			perfil,
			codinome,
			numLicença,
			individualidade,
			imgCapaUrl,
			imgPerfilUrl,
			imgRankingUrl,
		);
	}
}

function cadastrarUser(
	nome,
	sobrenome,
	email,
	senha,
	perfil,
	codinome,
	numLicença,
	individualidade,
	imgCapaUrl,
	imgPerfilUrl,
	imgRankingUrl,
) {
	fetch("/usuarios/cadastrarUser", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			nome,
			sobrenome,
			email,
			senha,
			perfil,
			codinome,
			numLicença,
			individualidade,
			imgCapaUrl,
			imgPerfilUrl,
			imgRankingUrl,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO cadastrarUser()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					console.log(json);
					console.log(JSON.stringify(json));

					alert("Usuário cadastrado com sucesso!");

					window.location = "login.html";
				});
			} else {
				console.log("Houve um erro ao tentar realizar o cadastro!");
				alert("Usuário já cadastrado!");

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
