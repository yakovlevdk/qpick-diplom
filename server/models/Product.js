const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    ref: 'Types'
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specifications: {
    color: String,
   type: Map, 
   of: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
