import { Header } from "../../components";
import { Footer } from "../../components/footer/footer";
import "./basket.scss";
import { BasketTotal } from "./components/basket-total/basket-total";
import { BreadCrumb } from "primereact/breadcrumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
export const Basket: React.FC = () => {
  const dispatch = useDispatch();
  const [productsFromBasket, setProductsFromBasket] = useState<productType[]>([]);
  const userBasket = useSelector((state: RootState) => state.userBasket.basket);
  const allProducts = useSelector((state: RootState) => state.products.products);
  const [showImg, setShowImg] = useState(true);
  const navigate = useNavigate();
  const { handleRender } = useRender();
  const cookieValue = getCookieToken();
  useEffect(() => {
    handleRender();
    if (!cookieValue) {
      navigate("/login");
    }
    setTimeout(() => {
      setShowImg(false);
    }, 500);
  }, []);
  useEffect(() => {
    handleRender();
    if (userBasket.length) {
      const productsList = userBasket[0].products;
      setProductsFromBasket(() => GetBasketProducts(allProducts, productsList));
    }
  }, [allProducts, dispatch]);
  return (
    <>
      {showImg ? (
        <div className="loader">
          <img src="/loader.svg" width={70} height={70} />
        </div>
      ) : (
        <div>
          <Header />
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
          <Footer />
        </div>
      )}
    </>
  );
};
