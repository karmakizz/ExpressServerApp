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

//Defining variables for the routes
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];
//Handle the creation of newUser (e.g., extracting it from req.body).
const newUser = { id: 3, name: 'Sam Smith' };

//Update updatedUser dynamically based on req.params.id.
const updatedUser = { id: 1, name: 'John Smith' };

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

//Create and use error-handling middleware.
app.use((err, req, res, next) => {
   //simulating an error
   if (usedId === 0) {
    const error = new Error('User not found');
    error.status = 404;
    next(error);
    }else{
        res.json({ id: usedId, name: 'John Doe' });
    }
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
 

  //Create and use at least two pieces of custom middleware.
  app.use(express.json());
    app.use((req, res, next) => {
        console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
        next();
    });
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
 