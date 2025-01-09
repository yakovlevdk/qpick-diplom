import { Link } from "react-router-dom";
import { MainPageOriginalSectionCard } from "./components/main-page-original-section-card/main-page-original-section-card";

const mainPageOriginalSectionDb = [
  {
    id: 1,
    imgUrl: "/mposai.jpg",
    linkUrl: "/catalog/iphone",
    title: "Apple iPhone",
    categorie: "Смартфоны",
    price: 34990,
  },
  {
    id: 2,
    imgUrl: "/mposaw.jpg",
    linkUrl: "/catalog/applewatch",
    title: "Apple Watch",
    categorie: "Умные часы",
    price: 22990,
  },
  {
    id: 3,
    imgUrl: "/mposam.jpg",
    linkUrl: "/catalog/macbook",
    title: "Apple Mac",
    categorie: "Компьютеры",
    price: 56990,
  },
  {
    id: 4,
    imgUrl: "/mposaipad.jpg",
    linkUrl: "/catalog/ipad",
    title: "Apple iPad",
    categorie: "Планшеты",
    price: 29990,
  },
  {
    id: 5,
    imgUrl: "/mpospl.jpg",
    linkUrl: "/catalog/gadgets",
    title: "Гаджеты",
    categorie: "Premium бренды",
    price: 15990,
  },
  {
    id: 6,
    imgUrl: "/mposapods.jpg",
    linkUrl: "/catalog/airpods",
    title: "Apple AirPods",
    categorie: "Беспроводные наушники",
    price: 4990,
  },
];

export const MainPageOriginalSection: React.FC = () => {
  return (
    <div className="main-page-original-section">
      <h2>Оригинальная техника в QPick</h2>
      <div className="main-page-original-section-cards">
        {mainPageOriginalSectionDb.map((product) => {
          return (
            <Link to={product.linkUrl} key={Math.random()}>
              {" "}
              <MainPageOriginalSectionCard
                title={product.title}
                imgUrl={product.imgUrl}
                categorie={product.categorie}
                price={product.price}
              />{" "}
            </Link>
          );
        })}
      </div>
      <Link to={"/catalog"}>
        <button className="main-page-original-section-button">
          Все товары
        </button>{" "}
      </Link>
    </div>
  );
};
