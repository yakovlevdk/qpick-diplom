const express = require('express');
const router = express.Router();
const {
  getBaskets,
  addToBasket,
  changeQuantityBasket,
  deleteFromBasket,
  getUserBasket
} = require('../controllers/basket-controller');

const authenticated = require('../middlewares/auth-middleware')

router.get('/', async (req, res) => {
  const baskets = await getBaskets();
  res.json(baskets);
});

router.post('/', authenticated, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;
    console.log(userId, productId);
    await addToBasket(userId, productId);
    return res.status(201).json({ message: 'Product added to basket' });
  } catch (error) {
    console.error('Error adding product to basket:', error.message);
    return res.status(500).json({ message: 'Failed to add product to basket' });
  }
});

// Изменение количества
router.post('/changequantity', async (req, res) => {
  await changeQuantityBasket(req.body.userId, req.body.productId, req.body.operator);
  return res.status(200).json({ message: 'Quantity updated' });
});

// Удаление из корзины
router.delete('/', async (req, res) => {
  await deleteFromBasket(req.body.userId, req.body.productId);
  res.status(204).send();
});

// Получение корзины пользователя
router.get('/:id', async (req, res) => {
  const userBasket = await getUserBasket(req.params.id);
  res.json(userBasket);
});

module.exports = router;
