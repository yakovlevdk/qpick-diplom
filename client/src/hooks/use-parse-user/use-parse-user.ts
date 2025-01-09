import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { userType } from "../../types/userType";
export const useParseUser = () => { 
    const navigate = useNavigate()
    const handleParseUser = (cookieValue: string) => { 
        try {
            if (cookieValue) {
            const user: userType =  jwtDecode(cookieValue);
            if ( user) { 
                return user
            }
            }
          } catch (error) {
            console.error("Ошибка декодирования токена:", error);
            setTimeout(() => navigate("/login"), 2000);
            return;
          }
    }
      return  {handleParseUser}
}