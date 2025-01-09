const express = require('express');
const router = express.Router();
const {
  getUsers,
  registerUser,
  loginUser,
  addInfoUser
} = require('../controllers/user-controller');

router.post('/register', async (req, res) => {
  const token = await registerUser(req.body.email, req.body.password);
  res.cookie('token', token);
  res.status(200).json({ message: 'Registered successfully' });
});

router.post('/login', async (req, res) => {
  const token = await loginUser(req.body.email, req.body.password);
  res.cookie('token', token);
  res.status(200).json({ message: 'Logged in successfully' });
});

router.get('/', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.post('/', async (req, res) => {
  const token = await addInfoUser(req.body.id, req.body.nameInfo, req.body.countryInfo);
  res.cookie('token', token);
  res.status(200).json({ message: 'Updated successfully' });
});

router.post('/logout', (req, res) => {
  res.cookie('token', '');
  return res.status(200).json({ message: 'Unauthorized' });
});

module.exports = router;
