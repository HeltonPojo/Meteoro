const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const { Server } = require('socket.io');

const app = express();
const options = {
    key: fs.readFileSync('../../privkey.pem'),
    cert: fs.readFileSync('../../fullchain.pem')
}

app.use(express.json());
app.use(cors());

//cd /opt/lampp/; ./manager-linux-x64.run

const db = mysql.createConnection({
    host: "database.croi64eak66x.sa-east-1.rds.amazonaws.com",
    user: "admin",
    password: "ENcAUT3CH32024",
    database: "meteoro"
})

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    email = email.toLowerCase();
    const sql = "SELECT Id, Email, Nome, horas, Cargo, estalecadas FROM Usuario WHERE Email = ? AND Senha = ?";
    db.query(sql, [email, senha], (err, data) => {
        if (err) return res.json("Erro no Login: ", err);
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("Informações incorretas");
        }
    })
})

app.post('/marcar-presenca', (req, res) => {
    // Dados recebidos do corpo da requisição
    const { email, senha, atividade, departamento } = req.body;

    // Consulta para inserir um novo registro na tabela 'Presenca'
    const sqlInsert = "INSERT INTO Horarios (IdUsuario, Entrada, Atividade, Departamento) VALUES (?, DATE_SUB(NOW(), INTERVAL 3 HOUR), ?, ?)";
    const sqlUpdatePresente = "UPDATE Usuario SET esta_na_sede = 1 WHERE Id = ?";

    // Consulta para verificar se o usuário existe
    const sqlSelectUser = "SELECT Id, Nome, Email, Cargo, horas, esta_na_sede FROM Usuario WHERE Email = ? AND Senha = ?";

    // Executa a consulta para verificar o usuário
    db.query(sqlSelectUser, [email, senha], (err, data) => {
        if (err) {
            return res.json("Erro no Login: ", err);
        }
        if (data.length > 0 && data[0].esta_na_sede != 1) {
            // Se o usuário existe e não está presente, executa a consulta para inserir a presença
            db.query(sqlUpdatePresente, [data[0].Id], (upErr, upData) => {
                if (upErr) {
                    return res.json("Erro ao Atualizar Presenca do Usuario: ", upErr);
                }
            });
            db.query(sqlInsert, [data[0].Id, atividade, departamento], (insertErr, insertData) => {
                if (insertErr) {
                    return res.json("Erro ao Inserir nova Entrada em Horarios: ", insertErr);
                }
                io.emit('NovaPresencaMarcada');
                return res.json("Presenca Marcada Com Sucesso");
            });
        } else {
            return res.json("Informações incorretas");
        }
    });
});

//Esse metodo precia retornar as horas e realizar as operacoes
app.post('/marcar-saida', (req, res) => {
    // Dados recebidos do corpo da requisição
    const { Id } = req.body;


    // Consulta para inserir um novo registro na tabela 'Presenca'
    const sqlUpdateSaida = "UPDATE Horarios SET Saida = DATE_SUB(NOW(), INTERVAL 3 HOUR) WHERE isnull(Saida) AND IdUsuario = ?";
    const sqlUpdatePresente = "UPDATE Usuario SET esta_na_sede = 0 , horas  = ADDTIME(horas, ?) WHERE Id = ?";

    // Consulta para verificar se o usuário existe
    const sqlSelectUser = "SELECT Id, esta_na_sede FROM Usuario WHERE Id = ?";
    const sqlSelectHora = "SELECT Id, Entrada FROM Horarios WHERE isnull(Saida) AND IdUsuario = ?";
    const sqlSelectHoraSaida = "SELECT Saida FROM Horarios WHERE Id = ?";
    var entrada;
    var saida;
    // Executa a consulta para verificar o usuário
    db.query(sqlSelectUser, [Id], (err, data) => {
        if (err) {
            return res.json("Erro no Login: ", err);
        }
        if (data.length > 0 && data[0].esta_na_sede != 0) {
            // Se o usuário existe e está presente, executa a consulta para inserir a presença

            db.query(sqlSelectHora, [data[0].Id], (slHErr, slHora) => {
                if (slHErr) {
                    return res.json("Erro no Select Horario: ", slHErr);
                }
                entrada = slHora[0].Entrada;

                db.query(sqlUpdateSaida, [data[0].Id], (upSErr, upSData) => {
                    if (upSErr) {
                        return res.json("Erro no Update Saida: ", upSErr);
                    }
                    db.query(sqlSelectHoraSaida, [slHora[0].Id], (slHSErr, slHSaida) => {
                        if (slHSErr) {
                            return res.json("Erro na consulta do Select Saida Horarios: ", slHSErr);
                        }

                        saida = slHSaida[0].Saida;

                        var diffMillis = saida - entrada;
                        var diffHoras = diffMillis / (1000 * 60 * 60);
                        var horas = Math.floor(diffHoras);
                        var minutos = Math.floor((diffHoras - horas) * 60);
                        var segundos = Math.floor(((diffHoras - horas) * 60 - minutos) * 60);

                        var horaFormatada = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
                        db.query(sqlUpdatePresente, [horaFormatada, data[0].Id], (upErr, upData) => {
                            if (upErr) {
                                return res.json("Erro no Update Presenca no Usuario: ", upErr);
                            }
                            io.emit('NovaSaidaMarcada');
                            return res.json("Saida marcada com sucesso");
                        });
                    });
                });
            });
        } else {
            return res.json("Informações incorretas");
        }
    });
});

app.get('/membros-presentes', (req, res) => {
    //adicionar nome no Banco de dados
    const sql = "SELECT Usuario.Id as Id, Nome, Email, Cargo, horas, Entrada FROM Usuario INNER JOIN Horarios on Usuario.Id=Horarios.IdUsuario WHERE esta_na_sede = 1 AND isnull(Horarios.Saida)";
    db.query(sql, (err, data) => {
        if (err) return res.json("Erro no Consulta Membros Presentes: ", err);
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json(data)
        }
    });
});

app.get('/ranking-membros', (req, res) => {
    const sql = "SELECT Id, Nome, Email, Cargo, horas FROM Usuario WHERE isAdmin = 0 ORDER BY horas DESC;";
    db.query(sql, (err, data) => {
        if (err) return res.json("Erro no Consulta Ranking dos  Membros: ", err);
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json(data)
        }
    });
});

const serverHttps = https.createServer(options, app);
const io = new Server(serverHttps,{
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log('Cliente conectado');
    io.on("disconnection", () => {
        console.log('Cliente desconectado');
    })
});

serverHttps.listen(8081);