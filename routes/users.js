const express = require('express');
const router = express.Router();

// Sample users data
const users = [
  { id: 1, name: 'John Doe', occupation: 'gardener' },
  { id: 2, name: 'Jane Doe', occupation: 'teacher' },
  {id: 3, name: 'John Smith', occupation: 'developer'},
  {id: 4, name: 'Jane Smith', occupation: 'designer'}
];

// Route to get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Route to create a new user (POST)
router.post('/', (req, res) => {
    // Ensure you get both the name and occupation from the body
    const { name, occupation } = req.body;
  
    if (name && occupation) {
      const newUser = {
        id: users.length + 1, // Simple ID generation, in real cases this should be handled by a database
        name,
        occupation
      };
  
      users.push(newUser); // Adding the new user to the "database" (array in this case)
      res.status(201).json(newUser); // Respond with the newly created user
    } else {
      res.status(400).json({ message: 'Name and Occupation are required' }); // Handle missing fields
    }
    });
// Route to get a user by ID (GET)
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Get the ID from the URL
    const user = users.find(user => user.id === userId); // Find the user with the matching ID
  
    if (user) {
      res.json(user); // Respond with the user if found
    } else {
      res.status(404).json({ message: 'User not found' }); // Return a 404 if no user is found
    }
  });

// Route to update a user (PUT)
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = users.find(user => user.id === userId);
  if (updatedUser) {
    updatedUser.name = req.body.name;
    updatedUser.occupation = req.body.occupation;
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Route to delete a user (DELETE)
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
