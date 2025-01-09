export const changeCountItem = async (userId: string, productId: string, operator: string) => {
  await fetch(`http://localhost:3000/baskets/changequantity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, productId, operator }),
  });
};
