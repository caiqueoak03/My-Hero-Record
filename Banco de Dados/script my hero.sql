CREATE DATABASE myHeroRecord;

USE myHeroRecord;

CREATE TABLE usuario (
	idUsuario int primary key auto_increment,
	nome varchar(45) not null,
	sobrenome varchar(45) not null,
	email varchar(45) not null unique,
	senha varchar(45) not null,
	perfil varchar(45) not null, check (perfil in ('comum', 'profissional')),
	nomeHeroi varchar(45),
	numLicença char(11),
	individualidade varchar(300),
	imgPerfilURL varchar(300),
	imgCapaURL varchar(300)
);

CREATE TABLE avaliação (
	fkFã int,
	fkHeroi int,
    nota int,
	foreign key (fkFã) references usuario (idUsuario),
	foreign key (fkHeroi) references usuario (idUsuario),
	primary key (fkFã, fkHeroi)
);

CREATE TABLE registro (
	idRegistro int primary key auto_increment,
	titulo varchar(45),
	descrição varchar(300),
    imgCapaURL varchar(300),
	fkHeroi int,
	foreign key (fkHeroi) references usuario (idUsuario)
);