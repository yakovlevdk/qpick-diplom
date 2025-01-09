import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { productType } from "../../types/productType";


export const useFindCurrentProduct = () => { 
    const products = useSelector((state: RootState) => state.products.products);
    const findCurrentProduct = (id: string) => { 
        if( products) { 
            return products.find((item: productType) => item["_id"] === id);

        }
        return null;
    } 
    return {findCurrentProduct}
}