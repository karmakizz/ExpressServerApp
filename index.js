const express = require('express');
const app = express();
const port = 8888;

//Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//Creating routes for different endpoints
app.get('/about', (req, res) => {
  res.send('About Page');
});
app.get('/contact', (req, res) => {
  res.send('Contact Page');
});
app.get('/users', (req, res) => {
res.json(users);
});
app.post('/users', (req, res) => {
  res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
res.json(updatedUser);
});
app.delete('/users/:id', (req, res) => {
res.json({essage:'User deleted'});
});
//Create and use at least two pieces of custom middleware.
app.use(express.json());
//Middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});
//Middleware to check for a specific header
app.use((req, res, next) => {
  if (req.headers['x-custom-header']) {
    next();
  } else {
    res.status(400).send('Missing custom header');
  }
});
//Create and use error-handling middleware.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
//Use at least three different data categories (e.g., users, posts, or comments).
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];
const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the second post.' }
];
const comments = [
  { id: 1, postId: 1, content: 'Great post!' },
  { id: 2, postId: 2, content: 'Thanks for sharing!' }
];

//Create GET routes for all data that should be exposed to the client.
