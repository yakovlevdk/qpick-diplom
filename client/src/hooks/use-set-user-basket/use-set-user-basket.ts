import { useDispatch } from "react-redux";
import { setUserBasket } from "../../slices/user-basket-slice";
import { jwtDecode } from "jwt-decode";
import { getUserBasket } from '../../api/get-user-basket'
import { getCookieToken} from '../../utils/get-cookie-token'
interface ParsedUserType  { 
email: string, 
id: string, 
name?: string | null,
country?: string | null,
role?: string | null 
}
export const useSetUserBasket =  () => {
  const dispatch = useDispatch();
  const handleSetUserBasket = async () => {
    const cookieValue: string | undefined =   getCookieToken()
    if ( cookieValue) { 
      const parsedUser: ParsedUserType = jwtDecode(cookieValue);
      const userId = parsedUser.id
      const userBasket = await getUserBasket(userId)
dispatch(setUserBasket(userBasket));
    }
}
return { handleSetUserBasket };

}
