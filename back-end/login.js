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
        console.log('Erro connecting to database...', err);
        return;
    }
    console.log('Connection established!');
});

app.post('/api/login', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Por favor, forneça nome, email e senha.' });
    }

   
    con.query('SELECT id, senha, adm FROM login WHERE nome = ? AND email = ?', [nome, email], (err, rows) => {
        if (err) {
            console.error('Erro ao consultar o banco:', err);
            return res.status(500).json({ error: 'Erro no servidor' });
        }

        if (rows.length === 0 || senha !== rows[0].senha) {
            return res.status(401).json({ error: 'Nome, email ou senha inválidos' });
        }

        const usuario = rows[0];

    
        if (usuario.adm === 1) {
            return res.status(201).json({ message: 'Usuário administrador autenticado', id: usuario.id });
        }

        res.status(200).json({ message: 'Usuário autenticado com sucesso', id: usuario.id });
    });
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000!');
});
