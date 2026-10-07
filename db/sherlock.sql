create database sherlock;
use sherlock;

create table usuario(
                        id_usuario int primary key identity,
                        nome_usuario varchar(50));

create table caso(
                     id_caso int primary key,
                     titulo varchar(50),
                     resposta_correta VARCHAR(50));

create table tentativa(
                          id_tentativa int primary key identity,
                          pontuacao_final int,
                          id_usuario int,
                          id_caso int,
                          tempo_segundos INT
                              foreign key (id_usuario) references usuario(id_usuario),
                          foreign key (id_caso) references Caso(id_caso));





select * from caso

SELECT * FROM tentativa

select * FROM usuario

