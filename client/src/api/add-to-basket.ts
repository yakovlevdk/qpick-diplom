export const addToBasket = async ( productId: string) => {
 return  await fetch(`http://localhost:3000/baskets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
    credentials: "include",
  })
};
