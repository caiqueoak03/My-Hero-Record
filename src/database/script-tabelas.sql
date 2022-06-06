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
	titulo varchar(100) not null unique,
	descrição varchar(1000) not null,
	imgCapaURL varchar(1000),
	dtOcorrencia date not null default(CURRENT_DATE()),
	foreign key (fkHeroi) references usuario (idUsuario)
);

INSERT INTO
	usuario
VALUES
	(null, 'Toshinori', 'Yagi', 'allmight@gmail.com','123','heroi','all might','12312312312','one for all',
		'https://i.pinimg.com/originals/fc/9b/f5/fc9bf5011b74827a04b910a20f42fc6d.png',
		'https://wallpaperaccess.com/full/5178804.jpg',
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

INSERT INTO
	usuario
VALUES
	(
		null,
		'Yu',
		'Takeyama',
		'mtlady@gmail.com',
		'123',
		'heroi',
		'Mt. Lady',
		'63256985674',
		'Crescer',
		'https://i.pinimg.com/originals/54/dc/8a/54dc8abd69000bbfff77943f40cfbd01.png',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-XuBY2y8S2Lkp0zH-q1SevIig_BeXB4g4_Z9bBocCGSDN951LeJ-cGLZEDEtT_TgN0yg&usqp=CAU',
		'https://cdn130.picsart.com/276930608011211.png'
	);

INSERT INTO
	usuario
VALUES
	(
		null,
		'Tyler',
		'Walker',
		'gangorca@gmail.com',
		'123',
		'heroi',
		'Gang Orca',
		'52365874512',
		'Poderes de uma orca',
		'https://i.pinimg.com/originals/60/e4/d1/60e4d15aa824aaafb7cb4c9bc4abafa8.png',
		'https://i.pinimg.com/originals/87/80/c2/8780c204e361c008fd9a4cd66640b062.jpg',
		'https://i.pinimg.com/originals/f0/19/a5/f019a5ed67712dc7292238788bfb0276.png'
	);

INSERT INTO
	usuario
VALUES
	(
		null,
		'Shinya',
		'Kamihara',
		'edgeshot@gmail.com',
		'123',
		'heroi',
		'Edgeshot',
		'32563245871',
		'Consegue manipular o corpo',
		'https://i.pinimg.com/originals/c3/39/c5/c339c5ecd4d9c4188e062d75e4536db3.png',
		'https://pbs.twimg.com/media/EafDLiWXsAQDVEa.jpg:large',
		'https://wallpapercave.com/wp/wp5959376.png'
	);

INSERT INTO ocorrencia VALUES 
(null, 1, 'All Might salva escola UA contra ataque de vilões', 'O herói número 1 salva o dia mais uma vez contra o ataque do famoso grupo de vilões que se acredita que pertença ao vilão número, o All for One.', 'https://www.enjpg.com/img/2020/all-might-6.jpg', '2022-06-06');

INSERT INTO ocorrencia VALUES 
(null, 2, 'Endeavour derrota vilão que atacava civis em zona urbana', 'O herói número 2 salvou civis que rondavam a zona urbana da cidade de Shimoto. O vilão tinha poderes de telecinese e o Endeavour consiguiu prender o vilão sem deixar vitimas.', 'https://i.pinimg.com/originals/02/57/88/02578845a9f80d1315f117eb36f1c691.jpg', '2022-06-08');

INSERT INTO ocorrencia VALUES 
(null, 1, 'All Might derrota vilão que atacou estudante', 'O vilão que tem a individualidade de se transformar em uma gosma que pode sufocar as pessoas atacou um jovem estudante que passava pela região onde acredita-se que o vilão atua, e o All Might chegou para salvar o jovem.', 'https://www.teahub.io/photos/full/279-2799985_all-might-wallpaper-my-hero-academia-all-might.jpg', '2022-06-01');

INSERT INTO ocorrencia VALUES 
(null, 3, 'Hawks salva pessoas de desabamento de prédio', 'O herói número 3 salva 300 pessoas que estavam em um prédio desabando. O herói, usando as penas de suas asas salvou as vitimas deixando apenas alguns feridos e nenhum morto.', 'https://c4.wallpaperflare.com/wallpaper/74/476/56/anime-my-hero-academia-hawks-boku-no-hero-academia-hd-wallpaper-preview.jpg', '2022-05-06');

INSERT INTO ocorrencia VALUES 
(null, 4, 'Mt. Lady derrota vilão na linha de trem', 'A heroína Mt. Lady que tem a individualidade de aumentar seu tamanho em até 50 vezes derrotou um vilão na linha de trem que liga as cidades de Nakano e Tsushima. O vilão estava impedindo a circulação dos trens através de sua individualidade de crescer, até que a heroína chegou golpeando-o quando estava distraído pelo herói Kamui Woods.', 'https://s3.us-east-1.amazonaws.com/dexerto-assets-production-cbbdf288/uploads/2020/05/23213020/my-hero-academia-mt-lady-cosplayer-steps-on-enemies-logo.png', '2022-03-26');

INSERT INTO ocorrencia VALUES 
(null, 5, 'Gang Orca desmantela operação criminosa', 'Durante sua investigação para saber onde vinha drogas que supostamente tiravam a individualidade de quem usava, o herói Gang Orca encontrou a base criminosa e prendeu os criminosos sem deixar feridos.', 'https://wallpapercave.com/wp/wp8293568.png', '2022-06-12');

INSERT INTO ocorrencia VALUES 
(null, 6, 'Ataque a base dos vilões', '"O herói número 4, Edgeshot fez um ataque surpresa à base do grupo de vilões conhecida como Black Hand. O herói informou ao noticiário que através de uma investigação conjunta com a polícia, descobriu o paradeiro de um dos membros do grupo que ficava próximo a uma famosa rua de Nakano.', 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/10/My-Hero-Academia-Edgeshot-Attacked.jpg?q=50&fit=crop&w=1920&dpr=1.5', '2022-06-06');

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
(5, 2, 8.9),
(6, 3, 8.1),
(7, 4, 7),
(8, 5, 7.1),
(9, 6, 7.5),
(10, 7, 7.9);