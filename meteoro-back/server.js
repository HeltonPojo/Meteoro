const express = require('express');
const mysql = require('mysql'); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//opt/lampp/lampp/manager-linux-x64.run

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"meteoro"
})

app.post('/login', (req, res) => {
    const sql = "SELECT Id, Email, Senha FROM Usuario WHERE Email = ? AND Senha = ?";
    db.query(sql, [req.body.email, req.body.senha], (err, data) => {
        if(err) return res.json("Erro no Login");
        if(data.length > 0){
            return res.json("Login Efetuado")
        } else {
            return res.json("Informações incorretas")
        }
    })
})

app.post('/marcar-presenca', (req, res) => {
    // Dados recebidos do corpo da requisição
    const { email, senha } = req.body;

    // Consulta para inserir um novo registro na tabela 'Presenca'
    const sqlInsert = "INSERT INTO Horarios (IdUsuario, Entrada) VALUES (?, NOW())";
    const sqlUpdatePresente = "UPDATE Usuario SET esta_na_sede = 1 WHERE Id = ?";

    // Consulta para verificar se o usuário existe
    const sqlSelectUser = "SELECT Id, esta_na_sede FROM Usuario WHERE Email = ? AND Senha = ?";
    
    // Executa a consulta para verificar o usuário
    db.query(sqlSelectUser, [email, senha], (err, data) => {
        if(err) {
            return res.json("Erro no Login");
        }
        if(data.length > 0 && data[0].esta_na_sede != 1){
            // Se o usuário existe e não está presente, executa a consulta para inserir a presença
            db.query(sqlUpdatePresente, [data[0].Id], (upErr, upData) =>{
                if(insertErr) {
                    return res.json("Erro ao marcar presença");
                }
            });
            db.query(sqlInsert, [data[0].Id], (insertErr, insertData) => {
                if(insertErr) {
                    return res.json("Erro ao marcar presença");
                }
                return res.json("Presença marcada com sucesso");
            });
        } else {
            return res.json("Informações incorretas");
        }
    });
});

app.post('/marcar-saida', (req, res) => {
    // Dados recebidos do corpo da requisição
    const { Id } = req.body;

    // Consulta para inserir um novo registro na tabela 'Presenca'
    const sqlInsert = "UPDATE Horarios SET Saida = NOW() WHERE Saida = NULL and IdUsuario = ?";
    const sqlUpdatePresente = "UPDATE Usuario SET esta_na_sede = 0 WHERE Id = ?";

    // Consulta para verificar se o usuário existe
    const sqlSelectUser = "SELECT Id, esta_na_sede FROM Usuario WHERE Id = ?";
    
    // Executa a consulta para verificar o usuário
    db.query(sqlSelectUser, [email, senha], (err, data) => {
        if(err) {
            return res.json("Erro no Login");
        }
        if(data.length > 0 && data[0].esta_na_sede != 0){
            // Se o usuário existe e está presente, executa a consulta para inserir a presença
            db.query(sqlUpdatePresente, [data[0].Id], (upErr, upData) =>{
                if(insertErr) {
                    return res.json("Erro ao marcar presença");
                }
            });
            db.query(sqlInsert, [data[0].Id], (insertErr, insertData) => {
                if(insertErr) {
                    return res.json("Erro ao marcar presença");
                }
                return res.json("Presença marcada com sucesso");
            });
        } else {
            return res.json("Informações incorretas");
        }
    });
});

app.listen(8081, () => {
    console.log("Ouvindo papai...")
})