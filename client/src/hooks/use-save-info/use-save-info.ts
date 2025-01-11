import { setProfileInfo } from "../../api/set-profile-info";
import { userType } from "../../types/userType";

 export const useSaveInfo = () => {
    const handleSaveInfo = async ({nameInfo, countryInfo, parsedUser} : {nameInfo: string; countryInfo: string; parsedUser: userType}) => {
        if (nameInfo && countryInfo && parsedUser) {
          await setProfileInfo(parsedUser.id, nameInfo, countryInfo);
        }
      };
      return { handleSaveInfo}
 }

