// Import our tools
const express = require('express');
const cors = require('cors');

// Our "Database" (In-memory array for now)
const movies = [
    { id: 1, title: "Inception", year: 2010, director: "Christopher Nolan" },
    { id: 2, title: "The Matrix", year: 1999, director: "The Wachowskis" },
    { id: 3, title: "Everything Everywhere All at Once", year: 2022, director: "Daniel Kwan, Daniel Scheinert" },
    { id: 4, title: "Spirited Away", year: 2001, director: "Hayao Miyazaki" }
];

// --- SERVER SETUP ---
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Allows us to parse incoming JSON in req.body
app.use(cors()); // Allows cross-origin requests from our frontend

// --- ROUTES ---

// 1. Root Route
app.get('/', (req, res) => {
    res.send("Welcome to the Movie API! 🍿");
});

// 2. GET all movies
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// 3. GET a specific movie by ID (Path Parameter)
app.get('/api/movies/:id', (req, res) => {
    const requestedId = parseInt(req.params.id);
    const movie = movies.find(m => m.id === requestedId);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send("Movie not found! 😭");
    }
});

// 4. POST a new movie
app.post('/api/movies', (req, res) => {
    const newMovie = req.body;

    // Assign a simple ID based on length
    newMovie.id = movies.length + 1;

    movies.push(newMovie);

    res.status(201).json(newMovie);
});

// Extra Challenge: DELETE a movie
app.delete('/api/movies/:id', (req, res) => {
    const requestedId = parseInt(req.params.id);
    const index = movies.findIndex(m => m.id === requestedId);

    if (index !== -1) {
        const deletedMovie = movies.splice(index, 1);
        res.json({ message: "Movie deleted", movie: deletedMovie });
    } else {
        res.status(404).send("Movie not found!");
    }
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});