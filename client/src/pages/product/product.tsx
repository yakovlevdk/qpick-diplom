import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./product.scss";
import { Link } from "react-router-dom";
import { Header } from "../../components";
import { Footer } from "../../components/footer/footer";
import { BreadCrumb } from "primereact/breadcrumb";
import { useEffect, useState } from "react";
import { useAddToCart } from "../../hooks/use-add-to-cart/use-add-to-cart";
import { useNavigate } from "react-router-dom";
import { Reviews } from "./components/reviews/reviews";
import { useSetBaskets } from "../../hooks/use-set-baskets/use-set-baskets";
import { useSetProducts } from "../../hooks/use-set-products/use-set-products";
import { getCookieToken } from '../../utils/get-cookie-token'
import { productType } from '../../types/productType'
import { RootState } from '../../store'
import { renderSpecifications } from "./utils/render-specifications";
import { useFindCurrentProduct } from "../../hooks/use-find-current-product/use-find-current-product";

type itemsType = { label: string; url: string }[];
export const Product: React.FC = () => {
  const { id } = useParams();
  const {findCurrentProduct} = useFindCurrentProduct()
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const products = useSelector((state: RootState) => state.products.products);
  const [items, setItems] = useState<itemsType | []>([]);
  const { handleSetProducts } = useSetProducts();
  const { handleSetBaskets } = useSetBaskets();
  const [product, setProduct] = useState<productType | null>();
  const { handleAddToCart } = useAddToCart();
  const [cookieValue] = useState(() => getCookieToken());
  useEffect(() => {
    handleSetProducts();
    handleSetBaskets();
    setUpdate((prev) => !prev);
  }, []);

  useEffect(() => {
      if (id) { 
        const foundedProducts = findCurrentProduct(id)
        setProduct(foundedProducts)
        if (foundedProducts) { 
          setItems([
            { label: "Главная", url: "/" },
            { label: "Каталог", url: "/catalog" },
            { label: `${foundedProducts.type}`, url: `/catalog/${foundedProducts.type.toLowerCase()}` },
            { label: `${foundedProducts.title}`, url: `/product/${foundedProducts._id}` },
          ]);
        }
      }
    
  }, [update, id, products]);


  const isTitleAndColorOfProductUnique = products?.filter(
    (prod) =>
      prod.title === product?.title &&
      prod.specifications.color === product?.specifications.color
  );

  const colorsForUniqueTitles = products?.filter(
    (prod) => prod.title === product?.title
  );

  const uniqueColors = Array.from(
    new Map(colorsForUniqueTitles.map((item) => [item.specifications.color, item])).values()
  );
 

  return (
    <>
      {product && (
        <div>
          <Header />
          <BreadCrumb model={items} />
          <div className="product-page">
            <h1 className="product-page-title">
              {product.title} {product.specifications.storage}{" "}
              {product.specifications.color}
            </h1>
            <div className="product-page-container">
              <div className="product-page-img-container">
                <img
                  src={product.imgUrl}
                  width={300}
                  height={300}
                  className="product-page-img"
                />
                <div className="product-page-img-container-description">
                  <h2>Описание</h2>
                  <span>{product.description}</span>
                </div>
                <div className="product-page-img-container-haract">
                  <h2>Характеристики</h2>
                  {renderSpecifications(product.specifications)}
                </div>
              </div>

              <div className="product-page-decription">
                <span className="product-page-decription-title">
                  {product.title} {product.specifications.color}{" "}
                  {product.specifications.storage}{" "}
                </span>
                {product.specifications.color &&   <div className="colors">
            <span>Цвет:</span>
                  {uniqueColors &&
                    uniqueColors.map((col) => {
                      return (
                        <Link to={`/product/${col._id}`} key={Math.random() }>
                          <span>{col.specifications.color}</span>
                        </Link>
                      );
                    })}
                </div>}  
              
                {product.specifications.storage && <span>Объем памяти:</span>}
          {product?.specifications.storage && <div className="storage-buttons">
                  {isTitleAndColorOfProductUnique[0].specifications.storage &&
                    isTitleAndColorOfProductUnique.map((gd) => {
                      return (
                        <Link to={`/product/${gd._id}`} key={Math.random()}>
                          <button className="storage-button">
                            {gd.specifications.storage}
                          </button>
                        </Link>
                      );
                    })}
                </div>}      
             {product.specifications.battery &&  <span>Батарея: {product.specifications.battery}</span> }  
                <span className="product-page-decription-price">
                  Цена: {product.price} ₽
                </span>
                <div className="product-page-buttons">
                  <button
                    onClick={() => {
                      if (product._id && cookieValue) {
                        handleAddToCart(product._id);
                        navigate("/basket");
                    } else {
                        navigate('/login');
                    }
                    }}
                  >
                    Купить!
                  </button>
                  <button
                    className="product-page-add-to-basket-button"
                    onClick={() =>
                      cookieValue
                        ? handleAddToCart(product["_id"])
                        : navigate("/login")
                    }
                  >
                    <img src="/basket2.png" />
                    Добавить в корзину
                  </button>
                </div>
              </div>
            </div>

            <Reviews productId={product["_id"]} />
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};
