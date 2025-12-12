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

// Signup
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

// Login
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

// Get all posts
app.get('/api/posts', authenticateToken, async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM posts");
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//Get 1 post
app.get('/api/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Create post
app.post('/api/posts', authenticateToken, async (req, res) => {
    try {
        const { body } = req.body;
        // req.user.userId comes from the authenticateToken middleware
        const newPost = await pool.query(
            "INSERT INTO posts (body, user_id) VALUES ($1, $2) RETURNING *",
            [body, req.user.userId]
        );
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Update post
app.put('/api/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        const updatePost = await pool.query(
            "UPDATE posts SET body = $1 WHERE id = $2 RETURNING *",
            [body, id]
        );
        res.json(updatePost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Delete 1 post
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        res.json("Post was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete all posts
app.delete('/api/posts', authenticateToken, async (req, res) => {
    try {
        await pool.query("DELETE FROM posts");
        res.json("All posts deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
