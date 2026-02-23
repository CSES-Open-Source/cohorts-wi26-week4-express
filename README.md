# Week 4: Backend Part 1 - Express Foundations

Welcome to the Backend! This week, we are stepping out of the browser and into the server. We will be building a RESTful API using Node.js and Express. By the end of this workshop, you will have a working server that serves movie data—the exact same data you used in your Week 3 React App!

## Prerequisites

- Ensure you have Node.js installed on your computer.
- Open this folder in VS Code.

## Step 1: Project Setup

Before we can write server code, we need to install our tools.

1. Open your terminal in VS Code (`Ctrl + ~` or `Cmd + ~`)
2. Make sure you are inside the starter folder: `cd starter`
3. Install the dependencies listed in our `package.json` file by running:

```bash
npm install
```

This downloads Express, which makes building servers easy, and CORS, which allows our frontend to talk to our backend safely.

## Step 2: The Server Skeleton

Open `server.js`. Let's set up the basic Express application.

Add the following code below your imports:

```javascript
const app = express();
const PORT = 3000;

// Middleware (This allows our server to read JSON data sent in requests)
app.use(express.json());
// Middleware to allow cross-origin requests
app.use(cors());

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
```

Test it out! Run `node server.js` in your terminal. You should see your console log pop up.

**Note:** Whenever you change your code, you will need to stop the server (`Ctrl + C`) and restart it (`node server.js`).

## Step 3: Your First Route (GET)

A route is like an item on a restaurant menu. Let's create a simple welcome route.

Add this above your `app.listen` code:

```javascript
// GET request to the root URL '/'
app.get('/', (req, res) => {
    res.send("Welcome to the Movie API! 🍿");
});
```

Restart your server. Open your web browser and go to `http://localhost:3000`. You should see your message!

## Step 4: GET All Movies

In the starter code, you'll see a movies array. Let's create an endpoint that sends this data to anyone who asks for it.

```javascript
// GET all movies
app.get('/api/movies', (req, res) => {
    // res.json() converts our JavaScript array into JSON format and sends it back
    res.json(movies); 
});
```

Restart your server and visit `http://localhost:3000/api/movies`. You should see a wall of JSON text!

## Step 5: GET a Specific Movie (Path Parameters)

What if a user clicks on a single movie and we only want to return that specific data? We can use Path Parameters.

```javascript
// GET a single movie by ID
app.get('/api/movies/:id', (req, res) => {
    // req.params grabs the dynamic part of the URL (the :id)
    const requestedId = parseInt(req.params.id); 
    
    // Find the movie in our array
    const movie = movies.find(m => m.id === requestedId);

    if (movie) {
        res.json(movie); // Send it if we found it
    } else {
        res.status(404).send("Movie not found! 😭"); // Error handling!
    }
});
```

Restart your server and visit `http://localhost:3000/api/movies/2`. You should get The Matrix. Try an ID that doesn't exist (like 99) to see your error!

## Step 6: Create a Movie (POST)

Now let's allow users to add new movies. We need to use a POST request. The data for the new movie will live inside the `req.body`.

```javascript
// POST a new movie
app.post('/api/movies', (req, res) => {
    const newMovie = req.body;
    
    // Create a fake unique ID for our new movie
    newMovie.id = movies.length + 1; 
    
    // Add it to our array
    movies.push(newMovie);
    
    // Respond letting the client know it worked (Status 201 = Created)
    res.status(201).json(newMovie);
});
```

### How to test a POST request?

- You can't easily make a POST request from your browser URL bar.
- If you have an extension like Thunder Client or software like Postman, use that.
- Alternatively, open a new terminal window and run this cURL command:

```bash
curl -X POST http://localhost:3000/api/movies \
-H "Content-Type: application/json" \
-d '{"title": "Spider-Man", "year": 2002, "director": "Sam Raimi"}'
```

Then, go back to `http://localhost:3000/api/movies` in your browser. You'll see Spider-Man at the bottom of the list!

**Note:** Because we are storing data in a simple Array, if you restart the server, your newly added movie will disappear. We'll fix this in Backend Part 2 with Databases!

## You Did It! 🎉

You've built your first RESTful API. You can now Read (GET) and Create (POST) data.

If you want an extra challenge, try figuring out how to write a DELETE route!