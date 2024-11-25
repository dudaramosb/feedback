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
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com banco de dados estabelecida!');
});

app.post('/api/updatePoints', (req, res) => {
    const { id, pontos } = req.body;

    if (!id || pontos === undefined) {
        return res.status(400).json({ message: 'ID e pontos são obrigatórios.' });
    }

    const updateQuery = 'UPDATE rkca SET pontos = ? WHERE id = ?';
    con.query(updateQuery, [pontos, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pontos:', err);
            return res.status(500).json({ message: 'Erro ao atualizar pontos.' });
        }

        if (result.affectedRows > 0) {
            return res.json({ message: 'Pontos atualizados com sucesso!' });
        } else {
            const insertQuery = 'INSERT INTO rkca (id, pontos) VALUES (?, ?)';
            con.query(insertQuery, [id, pontos], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Erro ao inserir novo usuário:', insertErr);
                    return res.status(500).json({ message: 'Erro ao inserir novo usuário.' });
                }

                return res.json({ message: 'Novo usuário criado e pontos inseridos com sucesso!' });
            });
        }
    });
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
