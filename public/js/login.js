function login() {
	const email = in_email.value;
	const senha = in_senha.value;

	if (email == "" || senha == "") {
		alert("Preencha todos os campos");
		return;
	}

	fetch("/usuarios/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			senha,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO login()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					console.log(json);
					console.log(JSON.stringify(json));

					alert(JSON.stringify(json) + "");

					sessionStorage.userLogado = true;
					sessionStorage.perfil = json[0].perfil;
					sessionStorage.imgPerfilUrl = json[0].imgPerfilURL;
					sessionStorage.imgCapaUrl = json[0].imgCapaURL;
					sessionStorage.idUser = json[0].idUsuario;

					if (json[0].perfil == "heroi") {
						window.location = "perfil/perfil.html";
						sessionStorage.nome = json[0].codinome;
					} else {
						window.location = "../index.html";
						sessionStorage.nome = json[0].nome + " " + json[0].sobrenome;
					}
				});
			} else {
				console.log("Houve um erro ao tentar realizar o login!");
				alert("Email ou senha incorretos!");

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
