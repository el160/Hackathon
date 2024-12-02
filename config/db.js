// importing
const connectMysql2 = require('connect-mysql2/lib/connect-mysql2');
const mysql = require('mysql2/promise');

require('dotenv').config();


const pool = mysql.createPool(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME
    }
);


module.exports = pool// make it available