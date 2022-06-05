CREATE DATABASE myHeroRecord;

USE myHeroRecord;

CREATE TABLE usuario (
	idUsuario int primary key auto_increment,
	nome varchar(45) not null,
	sobrenome varchar(45) not null,
	email varchar(45) not null unique,
	senha varchar(45) not null,
	perfil varchar(45) not null,
	check (perfil in ('comum', 'heroi')),
	codinome varchar(45),
	numLicença char(11),
	individualidade varchar(300),
	imgPerfilURL varchar(1000),
	imgCapaURL varchar(1000),
	imgRankingURL varchar(1000)
);
    
CREATE TABLE avaliação (
	idAvaliação int auto_increment,
	fkComum int,
	fkHeroi int,
	nota decimal(4,2) not null,
	dtNota datetime not null default(current_timestamp()),
	foreign key (fkComum) references usuario (idUsuario),
	foreign key (fkHeroi) references usuario (idUsuario),
	primary key (idAvaliação, fkComum, fkHeroi)
);

CREATE TABLE ocorrencia (
	idOcorrencia int primary key auto_increment,
	fkHeroi int,
	titulo varchar(45) not null,
	descrição varchar(300) not null,
	imgCapaURL varchar(1000),
	dtOcorrencia date not null default(CURRENT_DATE()),
	foreign key (fkHeroi) references usuario (idUsuario)
);

INSERT INTO
	usuario
VALUES
	(null, 'Toshinori', 'Yagi', 'allmight@gmail.com','123','heroi','all might','12312312312','one for all',
		'https://i.pinimg.com/originals/fc/9b/f5/fc9bf5011b74827a04b910a20f42fc6d.png',
		'https://images8.alphacoders.com/713/713073.png',
		'https://i.pinimg.com/originals/c8/af/90/c8af903d667860c8993e46bec640dfa6.png'
	);

INSERT INTO
	usuario
VALUES
	(
		null,
		'Enji',
		'Todoroki',
		'endeavour@gmail.com',
		'123',
		'heroi',
		'ENDEAVOUR',
		'78978978989',
		'flames',
		'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-a2e7-4b45-83ec-311e72e82900/del47mv-5d96cd4e-dcb8-4a55-b4df-72df3302b529.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg0ZGMxM2I3LWEyZTctNGI0NS04M2VjLTMxMWU3MmU4MjkwMFwvZGVsNDdtdi01ZDk2Y2Q0ZS1kY2I4LTRhNTUtYjRkZi03MmRmMzMwMmI1MjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TIxdI_BAz8xWH_WtP8KIRBdhDQOiVpQFhSM4x42xdCo',
		'https://images8.alphacoders.com/932/thumb-1920-932250.jpg',
		'https://static.wikia.nocookie.net/battle-saga-fan-fiction-series/images/a/a0/Endeavor.png'
	);	
	
INSERT INTO
	usuario
VALUES
	(
		null,
		'Keigo',
		'Takami',
		'hawks@gmail.com',
		'123',
		'heroi',
		'Hawks',
		'23423423434',
		'wings',
		'https://wallpapercave.com/wp/wp5961842.png',
		'https://i.pinimg.com/736x/60/37/44/6037446d5af1a2a820c1fb77bdee9491.jpg',
		'https://i.pinimg.com/originals/c6/ee/50/c6ee50c23d79d88f124dbc394e324d0a.png'
	);

INSERT INTO usuario (nome, sobrenome, email, senha, perfil) VALUES
('fulano', 'silva', 'fulano@gmail.com', '123', 'comum');

INSERT INTO usuario (nome, sobrenome, email, senha, perfil) VALUES
('ciclano', 'silva', 'ciclano@gmail.com', '123', 'comum');

INSERT INTO usuario (nome, sobrenome, email, senha, perfil) VALUES
('fulano2', 'silva', 'fulano2@gmail.com', '123', 'comum');

INSERT INTO usuario (nome, sobrenome, email, senha, perfil) VALUES
('fulano3', 'silva', 'fulano3@gmail.com', '123', 'comum');

INSERT INTO usuario (nome, sobrenome, email, senha, perfil) VALUES
('fulano4', 'silva', 'fulano4@gmail.com', '123', 'comum');

INSERT INTO avaliação (fkComum, fkHeroi, nota) VALUES 
(4, 1, 10),
(4, 2, 8.9),
(4, 3, 8.1);