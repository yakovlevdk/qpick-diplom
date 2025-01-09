export const deleteFromBasket = async (userId: string, productId: string) => {
  return fetch(`http://localhost:3000/baskets`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, productId }),
    credentials: "include",
  })
};
