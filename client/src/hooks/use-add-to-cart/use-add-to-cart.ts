import { addToBasket } from "../../api/add-to-basket";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate} from 'react-router-dom'
import { userType}from '../../types/userType'
import { getCookieToken} from '../../utils/get-cookie-token'
import { getProductTypes } from "../../api/get-product-types";
export const useAddToCart = () => {
  const navigate = useNavigate()
  const [cookieValue] = useState<string | undefined>(
   () => getCookieToken())
  
  const handleAddToCart = async (productId: string) => {
    
  const types = await    getProductTypes()
console.log(types);

    let parsedUser: userType;
      if (cookieValue) { 
        parsedUser = jwtDecode(cookieValue);
        if ( parsedUser) {
        const response = await addToBasket(productId);
        if (!response.ok) {
            const errorData = await response;
            console.error('Error status:', response.status, 'Error data:', errorData);
          navigate('/login')
          return;
      }
        }
      }
  };
  return { handleAddToCart };
};
