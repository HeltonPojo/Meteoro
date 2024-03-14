const express = require('express');
const mysql = require('mysql'); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//systemctl (start, status, stop) mysql
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

app.listen(8081, () => {
    console.log("Ouvindo papai...")
})