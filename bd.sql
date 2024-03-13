-- Gera��o de Modelo f�sico
-- Sql ANSI 2003 - brModelo.



CREATE TABLE Usuario (
Id INTEGER PRIMARY KEY,
Email VARCHAR(50),
Senha VARCHAR(20),
image_path VARCHAR(10),
esta_na_sede INTEGER
)

CREATE TABLE Horarios (
Id INTEGER PRIMARY KEY,
Entrada DATETIME,
Saida DATETIME,
IdUsuario INTEGER,
FOREIGN KEY(Id) REFERENCES Usuario (Id)
)

