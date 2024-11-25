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
        console.error('Erro ao conectar no banco de dados:', err);
        return;
    }
    console.log('Conexão estabelecida com o banco de dados!');
});


app.get('/api/rankingcaca', (req, res) => {
    const query = 'SELECT login.nome, rkca.pontos FROM login INNER JOIN rkca ON login.id = rkca.login_id ORDER BY rkca.pontos DESC';
    con.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar ranking:', err);
            res.status(500).send('Erro no servidor');
            return;
        }
        res.status(200).json(results);  
    });
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});