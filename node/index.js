const express = require('express');
const app = express();
const port = 5000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql');
app.listen(port, () => console.log(`Rodando na porta ${port}!`));

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config);
    const date = new Date();
    const criartabela = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255), PRIMARY KEY(id))`;
    connection.query(criartabela);
    const sql = `INSERT INTO people(name) values('Full Cycle ${date.getTime()}')`;
    connection.query(sql);
    const sqlSelect = `SELECT name FROM people`;

    const result = connection.query(sqlSelect, (err, result) => {
        let html = '<h1>Full Cycle Rocks!</h1>';
        html += '<br>- Listar de Nomes - <br>';
        html += '<ul>';
        result.forEach(element => {
            html += `<li>${element.name}</li>`
        });
        html += '</ul>';
        res.send(html)
    });
    connection.end();
});

