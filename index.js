const express = require('express');
const app = express();
const port = 8888;
const userRoutes = require('./routes/users');

app.use(express.urlencoded({ extended: true })); // This parses the form data
app.use(express.json()); // This parses JSON data

// Middleware to serve static files (including favicon)
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');
// Define the root route for rendering views
app.get('/', (req, res) => {
  res.render('index', { title: 'I just work here' });
});
 // Skip custom header check for static files like favicon
app.use('/favicon.ico', (req, res) => res.status(204).send());

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Use the user routes for anything starting with '/users'
app.use('/users', userRoutes);

// Skip custom header check for static files like favicon
app.use('/favicon.ico', (req, res) => res.status(204).send());

// Apply custom header middleware only to routes that need it (/users API)
app.use('/users', (req, res, next) => {
  if (req.headers['x-custom-header']) {
    next();
  } else {
    res.status(400).send('Missing custom header');
  }
});

// Define routes for the root, about, and contact pages
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Page' });
});

// Error-handling middleware (should come last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Define route for the About page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Define route for the Contact page
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


//localhost:8888/users creates a new user POST (CREATE)
//localhost:8888/users retrieves all users GET (READ)
//localhost:8888/users/1 retrieves the user with ID 1 GET 
//localhost:8888/users/2 updates the user with ID 2 PUT (UPDATE)
//localhost:8888/users/3 deletes the user with ID 3 (DELETE)