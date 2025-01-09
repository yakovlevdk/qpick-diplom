import { productType } from "../../types/productType";

export const useRemoveFromFavorites = () => { 
    const favoritesString = localStorage.getItem("favorites");
    const favorites: productType[] = favoritesString ? JSON.parse(favoritesString) : [];
      const removeFromFavorites = (card: productType) => {
        if (favorites) { 
          const newCards = favorites.filter(
            (product: productType) => product["_id"] !== card["_id"]
          );
          localStorage.setItem("favorites", JSON.stringify(newCards));
          location.reload();
        }
   
}
return { removeFromFavorites}
}

