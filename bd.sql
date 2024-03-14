CREATE TABLE Usuario (
Id INTEGER PRIMARY KEY,
Email VARCHAR(50),
Senha VARCHAR(20),
image_path VARCHAR(20),
horas TIME,
Cargo VARCHAR(50),
esta_na_sede INTEGER
)

CREATE TABLE Horarios (
Id INTEGER PRIMARY KEY,
Entrada DATETIME,
Saida DATETIME,
IdUsuario INTEGER,
FOREIGN KEY(IdUsuario) REFERENCES Usuario (Id)
)

