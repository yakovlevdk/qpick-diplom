import { EmptyFavorites } from "./components/empty-favorites";
import { FavoritesAttention } from "./components/favorites-attention";

import "./favorites.scss";
import { FavoritesCard } from "./components/favorites-card";
import { productType} from '../../types/productType'
 const Favorites = () => {
  const cards: string | null = localStorage.getItem("favorites");
  const jsonCards: productType[] = JSON.parse(cards ?? '[]');

  return (
    <>
      <div className="favorites-container">
        {!jsonCards || jsonCards.length < 1 ? (
          <EmptyFavorites />
        ) : (
          <div className="favorites">
            <h1>Избранное</h1>
            <FavoritesAttention />
            <h2>Добавленные товары</h2>
            <div className="favorites-cards">
              {jsonCards.map((card) => (
                <FavoritesCard key={card._id} card={card} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites