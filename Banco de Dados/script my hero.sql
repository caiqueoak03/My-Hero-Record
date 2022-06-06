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