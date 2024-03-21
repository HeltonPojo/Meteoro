CREATE TABLE Usuario (
Id AUTO_INCREMENT INTEGER PRIMARY KEY ,
Email VARCHAR(255) UNIQUE,
Nome VARCHAR(255),
Senha VARCHAR(255),
image_path VARCHAR(255),
horas TIME,
Cargo VARCHAR(255),
Departamento VARCHAR(255),
estalecadas INTEGER,
isAdmin INTEGER,
esta_na_sede INTEGER,
leu_mensagem INTEGER
);

CREATE TABLE Horarios (
Id INTEGER PRIMARY KEY,
Entrada DATETIME,
Saida DATETIME,
IdUsuario INTEGER,
FOREIGN KEY(IdUsuario) REFERENCES Usuario (Id)
);

