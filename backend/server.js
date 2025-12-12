const express = require('express');
const cors = require('cors');
const { pool, createTable } = require('./database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

createTable();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );

        const token = jwt.sign({ userId: newUser.rows[0].id, email }, SECRET_KEY, {expiresIn: '1h'});
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error: " + err.message);

    }

});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM user WHERE email = $1", [email]);

        if (user.rows.length === 0) return res.status(400).json("User not found");

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(400).json("Invalid password");

        const token = jwt.sign({ userID: user.rows[0].id, email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    
    }
});

app.get('/api/posts', authenticateToken, async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM posts");
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});


