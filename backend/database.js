require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const createTable = async () => {
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(60) UNIQUE NOT NULL,
                password VARCHAR(60) NOT NULL 
            );
        `);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                body TEXT NOT NULL,
                date DATE DEFAULT CURRENT_DATE,
                user_id INTEGER REFERENCES users(id)
            );
        `);
        console.log("Success (Tables createD)")
    } catch (err) {
        console.error("Error (Tables created)", err);
    }
};

module.exports = { pool, createTable};