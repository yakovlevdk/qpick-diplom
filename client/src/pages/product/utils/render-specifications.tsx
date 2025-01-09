import { productType } from "../../../types/productType";

 export const renderSpecifications = (specifications: productType["specifications"]) => {
    return Object.entries(specifications)
      .slice(3)
      .map(([key, value]) => (
        <div key={key} className="product-haract">
          <span className="product-haract-title">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>{" "}
          <span className="product-haract-value">{value}</span>
        </div>
      ));
  };
