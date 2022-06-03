function carregarDados() {
	const idUsuario = sessionStorage.idUser;

	fetch("/usuarios/carregarDados", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idUsuario,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO carregarDados()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					console.log(json);
					console.log(JSON.stringify(json));

					in_nome.value = json[0].nome;
					in_sobrenome.value = json[0].sobrenome;
					in_email.value = json[0].email;
					in_senha.value = json[0].senha;
					in_confirmarSenha.value = json[0].senha;

					in_codinome.value = json[0].codinome;
					in_individualidade.value = json[0].individualidade;
					in_imgPerfilUrl.value = json[0].imgPerfilURL;
					in_imgCapaUrl.value = json[0].imgCapaURL;
					in_imgRankingUrl.value = json[0].imgRankingURL;
				});
			} else {
				console.log("Houve um erro ao tentar realizar o carregarDados!");

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

function validar() {
	let alerta = "";

	const nome = in_nome.value;
	const sobrenome = in_sobrenome.value;
	const email = in_email.value;
	const senha = in_senha.value;
	const confirmarSenha = in_confirmarSenha.value;

	const codinome = in_codinome.value;
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

	if (codinome == "") {
		alerta += "*Preencha seu nome de herói\n";
	}

	if (individualidade == "") {
		alerta += "*Descreva sua individualidade\n";
	}

	if (imgRankingUrl == "") {
		alerta += "*É obrigatório colocar uma imagem para o ranking!\n";
	}

	if (alerta != "") {
		alert(alerta);
	} else {
		atualizarUser(
			nome,
			sobrenome,
			email,
			senha,
			codinome,
			individualidade,
			imgCapaUrl,
			imgPerfilUrl,
			imgRankingUrl,
		);
	}
}

function atualizarUser(
	nome,
	sobrenome,
	email,
	senha,
	codinome,
	individualidade,
	imgCapaUrl,
	imgPerfilUrl,
	imgRankingUrl,
) {
	fetch("/usuarios/atualizarUser", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			nome,
			sobrenome,
			email,
			senha,
			codinome,
			individualidade,
			imgCapaUrl,
			imgPerfilUrl,
			imgRankingUrl,
			idUser: sessionStorage.idUser,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO atualizarUser()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					console.log(json);
					console.log(JSON.stringify(json));

					alert("Dados alterados com sucesso!");
				});
			} else {
				console.log("Houve um erro ao tentar realizar as alterações!");
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
