const Review = require("../models/Review");

async function getReviews() {
  const reviews = await Review.find();
  return reviews;
}

async function addReview(productId, userId, userName, rate, content) {
  console.log('123')
  await Review.create({
    product_id: productId,
    user_id: userId,
    user_name: userName || 'Аноним',
    rate: rate,
    content: content,
  });
}

module.exports = { getReviews, addReview };
