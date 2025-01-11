
import "./basket.scss";
import { BasketTotal } from "./components/basket-total/basket-total";
import { BreadCrumb } from "primereact/breadcrumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { BasketItem } from "./components/basket-item/basket-item";
import { getCookieToken } from "../../utils/get-cookie-token";
import { EmptyBasket } from "./components/basket-empty/basket-empty";
import { GetBasketProducts } from "./utils/get-basket-products.ts";
import { useRender } from "../../hooks/use-render/use-render";
import { productType } from '../../types/productType'
import { RootState} from '../../store'
const items = [
  { label: "Главная", url: "/" },
  { label: "Корзина", url: "/basket" },
];
 const Basket: React.FC = () => {
  const [productsFromBasket, setProductsFromBasket] = useState<productType[]>([]);
  const userBasket = useSelector((state: RootState) => state.userBasket.basket);
  const allProducts = useSelector((state: RootState) => state.products.products);

  const navigate = useNavigate();
  const { handleRender } = useRender();
  const cookieValue = getCookieToken();
  useEffect(() => {
    if(!userBasket.length) { 
      handleRender();      
    }
    if (!cookieValue) {
      navigate("/login");
    }
 
  }, []);
  useEffect(() => {
    if (userBasket.length) {
      console.log('userBasket[0]', userBasket)
      const productsList = userBasket[0].products;
      setProductsFromBasket(() => GetBasketProducts(allProducts, productsList));
    }
  }, [allProducts]);
  
  return (
    <>
     
        <div>
          <BreadCrumb model={items} />
          <div className="basket">
            {userBasket.length < 1 || userBasket[0].products.length < 1 ? (
              <EmptyBasket />
            ) : (
              <>
                <h1>Корзина</h1>
                <div className="basket-items">
                  <div className="basket-products">
                    <BasketItem productsFromBasket={productsFromBasket} />
                  </div>
                  <div className="basket-total-containet">
                    <BasketTotal productsFromBasket={productsFromBasket} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
    
    </>
  );
};

export default Basket