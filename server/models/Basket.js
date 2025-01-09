const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const BasketSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  products: [productSchema],
});

const Basket = mongoose.model("Basket", BasketSchema);

module.exports = Basket;
