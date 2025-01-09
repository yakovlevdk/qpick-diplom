const express = require('express');
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products-controller');

router.get('/', async (req, res) => {
  const products = await getProducts();
  res.json(products);
});

router.post('/', async (req, res) => {
  await addProduct(req.body);
  return res.status(201).json({ message: 'Product added successfully' });
});

router.put('/edit/:id', async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
   return res.status(200).json(updatedProduct);
  } catch (error) {
      return res.status(404).json({ message: 'Error updating product' });
     
  }
});

router.delete('/:id', async (req, res) => {
  await deleteProduct(req.params.id);
  res.status(204).send();
});

module.exports = router;
