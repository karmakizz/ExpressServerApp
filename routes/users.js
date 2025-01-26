const express = require('express');
const router = express.Router();

// Sample users data
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

// Route to get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Route to create a new user (POST)
router.post('/', (req, res) => {
  const newUser = { id: 3, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route to update a user (PUT)
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = users.find(user => user.id === userId);
  if (updatedUser) {
    updatedUser.name = req.body.name;
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
