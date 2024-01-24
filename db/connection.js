const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mysql_first_day_db'
});

module.exports = connection.promise();