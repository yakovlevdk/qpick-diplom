import { CatalogCards } from "./components/catalog-card/catalog-card";
import { CatalogChoosePanel } from "./components/catalog-choose-panel/catalog-choose-panel";
import { BreadCrumb } from "primereact/breadcrumb";
import { checkCurrentType } from "./utlis/check-current-type";
import "./catalog.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetProducts } from "../../hooks/use-set-products/use-set-products";
 const Catalog: React.FC = () => {
  const { type } = useParams();
  const [currentType, setCurrentType] = useState("");
    const { handleSetProducts } = useSetProducts();
  useEffect(() => { 
    handleSetProducts()
  }, []);
  useEffect(() => {
if (type) { 
  const result = checkCurrentType(type);
  if  (result) { 
    setCurrentType(result);
  }
} }, [type]);
  const items = [
    { label: "Главная", url: "/" },
    { label: "Каталог", url: "/catalog" },
  ];
  if (type && currentType) {
    items.push({ label: `${currentType}`, url: `/catalog/${type} ` });
  }
    return (
    <>
  
        <div>
          <div className="catalog">
            <BreadCrumb model={items} />
            <h1 className="catalog-header">Каталог</h1>
            <CatalogChoosePanel />
            <CatalogCards />
          </div>
        </div>
    </>
  );
};


export default Catalog