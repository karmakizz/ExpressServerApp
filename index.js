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
res.json({message:'User deleted'});
});

  //Create and use at least two pieces of custom middleware.
  app.use(express.json());
    app.use((req, res, next) => {
        console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
        next();
    });