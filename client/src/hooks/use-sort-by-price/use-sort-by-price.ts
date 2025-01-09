import { useDispatch } from "react-redux";
import { setFilteredProductsByPrice } from "../../slices/filtered-products-by-price-slice";
import { productType } from "../../types/productType";

export const useSortByPrice = () => {
  const dispatch = useDispatch();
  const handleSortByPrice = (productsOnSort: productType[]) => {
    const filteredProducts = [...productsOnSort].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
    dispatch(setFilteredProductsByPrice(filteredProducts));
  };
  return { handleSortByPrice };
};
