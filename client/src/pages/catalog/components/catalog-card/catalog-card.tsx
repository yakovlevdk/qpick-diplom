import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RenderProducts } from "./components/render-product";
import { RootState} from '../../../../store'
import { isFilteredCurrentProducts } from "../../utlis/is-filtered-current-products";
import {
  setFilteredProductsByType,
} from "../../../../slices/filtered-products-by-type-slice";
import { productType } from "../../../../types/productType";


export const CatalogCards: React.FC = () => {
  const dispatch = useDispatch();
  const { type } = useParams();

  const filteredByTypeProducts = useSelector(
    (state: RootState) => state.filteredProductsByType.products
  );

  const filteredByPriceProducts = useSelector(
    (state: RootState) => state.filteredProducts.products
  );

  const allProducts = useSelector(
    (state: RootState) => state.products.products
  );

  useEffect(() => {
    if (type && type === 'applewatch') { 
      const filteredByType = allProducts.filter(
        (product: productType) => product.type === 'Apple Watch'
      );
      dispatch(setFilteredProductsByType(filteredByType));
      console.log(filteredByType);
    } else if (type) {
      const filteredByType = allProducts.filter(
        (product: productType) => product.type.toLowerCase() === type
      );
      dispatch(setFilteredProductsByType(filteredByType));
    } 
  }, [type, allProducts, dispatch]);

  return (
    <div className="catalog-card-container">
      {isFilteredCurrentProducts(filteredByPriceProducts)
        ? RenderProducts(filteredByPriceProducts)
        : isFilteredCurrentProducts(filteredByTypeProducts)
        ? RenderProducts(filteredByTypeProducts)
        : RenderProducts(allProducts)}
    </div>
  );
};
