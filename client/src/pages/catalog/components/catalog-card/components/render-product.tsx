import { Link } from "react-router-dom";
import { useAddToCart } from "../../../../../hooks/use-add-to-cart/use-add-to-cart";
import { productType } from '../../../../../types/productType'
import { useAddToFavorites } from "../../../../../hooks/use-add-to-favorites/use-add-to-favorites";
import { useRemoveFromFavorites } from "../../../../../hooks/use-remove-from-favorites/use-remove-from-favorites";
export const RenderProducts = (products: Array<productType>) => {
  const { handleAddToCart } = useAddToCart();
  const favoritesString = localStorage.getItem("favorites");
  const favorites: productType[] = favoritesString ? JSON.parse(favoritesString) : [];
  const { addToFavorites} = useAddToFavorites()
 const { removeFromFavorites} = useRemoveFromFavorites()

  return (
    <>
      {products.map((product: productType) => (
        <div className="catalog-card" key={product["_id"]}>
          <div className="catalog-card-like">
            <img
              src={
                favorites.find((prod) => prod["_id"] === product["_id"])
                  ? "/fiil-like.svg"
                  : "/like.svg"
              }
              className={
                favorites.find((prod) => prod["_id"] === product["_id"])
                  ? "catalog-fill-favorite"
                  : "catalog-favorite"
              }
              alt="Like"
              onClick={() =>
                favorites.find((prod) => prod["_id"] === product["_id"])
                  ? removeFromFavorites(product)
                  : addToFavorites(product)
              }
            />
          </div>
          <img
            src={product.imgUrl}
            className="catalog-card-img"
            alt={product.title}
          />
          <span className="catalog-card-title">{product.title}</span>
          <span className="catalog-card-description">
            {product.specifications.storage} {product.specifications.color}
          </span>
          <span className="catalog-card-price">{product.price} ₽</span>
          <div className="catalog-card-basket">
            <Link to={`/product/${product["_id"]}`}>
              <button>Подробнее...</button>
            </Link>
            <img
              src="/basket.svg"
              alt="Basket"
              onClick={() => {
                if( product['_id']) { 
                  handleAddToCart(product["_id"])
                }
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};
