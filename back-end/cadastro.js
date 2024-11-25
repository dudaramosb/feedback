
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');


const app = express();


app.use(bodyParser.json());
app.use(cors());


const con = mysql.createConnection({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10747006',              
    password: 'hNs6DxUzAn',           
    database: 'sql10747006',          
    port: 3306                        
});

con.connect((err) => {
    if (err) {
        console.log('Erro ao conectar no banco de dados:', err);
        return;
    }
    console.log('Conexão estabelecida com o banco de dados!');
});


app.post('/api/cadastro', (req, res) => {
    const { nome, email, confirmEmail, senha, confirmSenha } = req.body;

    
    if (!nome || !email || !confirmEmail || !senha || !confirmSenha) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    if (email !== confirmEmail) {
        return res.status(400).send('Os emails não coincidem.');
    }

    if (senha !== confirmSenha) {
        return res.status(400).send('As senhas não coincidem.');
    }

    
    const query = 'INSERT INTO login (nome, email, senha) VALUES (?, ?, ?)';
    con.query(query, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco:', err);
            return res.status(500).send('Erro no servidor');
        }

        res.status(201).send('Usuário cadastrado com sucesso!');
    });
});


app.listen(5000, () => {
    console.log('Servidor em execução na porta 5000!');
});