import { useDispatch, useSelector } from "react-redux";
import { CatalogChoosePanelItem } from "./components/catalog-choose-panel-item/catalog-choose-panel-item";
import { useSortByPrice } from "../../../../hooks/use-sort-by-price/use-sort-by-price";
import { clearFilteredProducts } from "../../../../slices/filtered-products-by-price-slice";
import { isFilteredCurrentProducts } from "../../utlis/is-filtered-current-products";
import { RootState} from '../../../../store'
import { useParams } from "react-router-dom";
import { useGetTypes } from "../../../../hooks/use-get-types/use-get-types";
import { useEffect, useState } from "react";
import { TypesType } from "../../../../types/typesType";

export const CatalogChoosePanel: React.FC = () => {
  const { type } = useParams();
  const { handleGetTypes } = useGetTypes()
  const dispatch = useDispatch();
  const allProducts = useSelector((state: RootState) => state.products.products);
  const { handleSortByPrice } = useSortByPrice();
  const panelByType = allProducts.filter(
    (prod) => prod.type.toLowerCase() === type
  );
  const filteredByTypeProducts = useSelector(
    (state: RootState) => state.filteredProductsByType.products
  );
  const filteredByPriceProducts = useSelector(
    (state: RootState) => state.filteredProducts.products
  );

  const uniqueTitles = panelByType?.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.title === product.title)
  );
  const [types, setTypes] = useState<TypesType[]>([]); 

  useEffect(() => {
    const fetchTypes = async () => {
      const typesData = await handleGetTypes();
      console.log(typesData);
      setTypes(typesData);
    };

    fetchTypes();
  }, []); 



  return (
    <div className="catalog-choose-panel">
      <div className="catalog-choose-panel-items">
        {uniqueTitles.length
          ? uniqueTitles.map((item) => {
              return (
                <CatalogChoosePanelItem
                  key={item._id}
                  title={item.title}
                  imgUrl={item.imgUrl}
                  linkUrl={`/product/${item["_id"]}`}
                />
              );
            })
          : types.map((item) => {
              return (
                <CatalogChoosePanelItem
                  key={Math.random() }
                  title={item.title}
                  imgUrl={item.imgUrl}
                  linkUrl={item.linkUrl}
                />
              );
            })}
      </div>
      {filteredByPriceProducts.length === 0 && (
        <button
          className="catalog-choose-panel-sort-button"
          onClick={() => { 
            const isFiltered =  isFilteredCurrentProducts(filteredByTypeProducts)
            handleSortByPrice(isFiltered
              ? filteredByTypeProducts
              : allProducts
          )
          }
          }
        >
          Сортировать
        </button>
      )}
      {filteredByPriceProducts.length > 0 && (
        <button
          className="catalog-choose-panel-sort-button"
          onClick={() => dispatch(clearFilteredProducts())}
        >
          Отменить
        </button>
      )}
    </div>
  );
};
