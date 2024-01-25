const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'learning.c5ouqe2c01os.us-east-1.rds.amazonaws.com',
    user: 'ds',
    password: 'password123',
    database: 'user_app_db',
    multipleStatements: true
}).promise();

const users = [];
let amount = 10;

while (amount--) {
    users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'password123'
    });
}

const preparedUsers = users.map(user => [user.username, user.email, user.password]);

const tableSchema = `
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL
);
`;

async function seed() {
    try {
        await db.query(`DROP TABLE IF EXISTS users; ${tableSchema}`);
        console.log('Table created');

        await db.query('INSERT INTO users (username, email, password) VALUES ?', [preparedUsers]);
        console.log('Users seeded successfully!');

        process.exit();
    } catch (err) {
        console.log(err);
    }
}

seed();