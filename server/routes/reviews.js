const express = require('express');
const router = express.Router();
const { getReviews, addReview } = require('../controllers/review-controller');
const authenticated = require('../middlewares/auth-middleware');
router.get('/', async (req, res) => {
  const reviews = await getReviews();
  res.json(reviews);
});

router.post('/', authenticated, async (req, res) => {
    const { productId, rate, content } = req.body;
    const { _id: userId, name: userName } = req.user;
    await addReview(productId, userId, userName, rate, content);
    return res.status(201).json({ message: 'Review added successfully' });
});

module.exports = router;
