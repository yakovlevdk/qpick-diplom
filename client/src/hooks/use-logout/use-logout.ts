import { useNavigate } from "react-router-dom";
import { Logout } from "../../api/logout";

export const useLogout = () => { 
    const navigate = useNavigate()
    const handleLogout  = async ()  => {
          const response = await Logout()
          if (response.status === 200) {
            navigate("/login");
            return;
          }     
      };
return {handleLogout}    
    }
