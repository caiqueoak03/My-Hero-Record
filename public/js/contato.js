function validar() {
	let alerta = "";

	const nome = in_nome.value;
	const email = in_email.value;
	const titulo = in_titulo.value;
	const mensagem = in_mensagem.value;

	if (nome == "" && email == "" && titulo == "" && mensagem == "") {
		alert("Preencha todos os campos");
		return;
	}

	if (nome == "") {
		alerta += "*Digite seu nome\n";
	}

	if (email == "") {
		alerta += "*Digite seu email\n";
	}

	if (titulo == "") {
		alerta += "*Escreva um titulo para a mensagem\n";
	}

	if (mensagem == "") {
		alerta += "*Digite sua mensagem";
	}

	if (alerta == "") {
		alert("Mensagem enviada com sucesso!");
	} else {
		alert(alerta);
	}
}
