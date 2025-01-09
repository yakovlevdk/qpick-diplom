import { productType } from "../../types/productType";

export const useAddToFavorites = () => { 
    const addToFavorites = (product: productType) => {
        if (product) {
          const favoritesString = localStorage.getItem("favorites");
          const favoritesToAdd: productType[] =favoritesString ? 
            JSON.parse(favoritesString) : [];
    
          favoritesToAdd.push(product);
          localStorage.setItem("favorites", JSON.stringify(favoritesToAdd));
          location.reload();
        }
      };
      return { addToFavorites}
}