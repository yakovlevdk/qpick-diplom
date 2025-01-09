import { addReview } from "../../api/add-review";
import { userType } from "../../types/userType";

 export const useAddReview = () => { 
    const addNewReview = ({parsedUser, value, content, productId } : {parsedUser: userType, value: number, content: string, productId: string} )  => {
        if (parsedUser) { 
          addReview({
            productId: productId,
            userId: parsedUser.id,
            userName: parsedUser.name,
            rate: value,
            content: content,
          });
        }
      };
return {addNewReview }    
 }
 
