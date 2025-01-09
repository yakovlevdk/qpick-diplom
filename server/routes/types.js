const express = require('express');
const router = express.Router();
const {
  getTypes,
} = require('../controllers/types-controller');

router.get('/', async (req, res) => {
  const types = await getTypes();
  res.json(types);
});



module.exports = router;
