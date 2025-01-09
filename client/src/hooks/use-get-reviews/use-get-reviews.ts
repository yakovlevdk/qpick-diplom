import { useDispatch } from "react-redux";
import { getAsyncReviews } from "../../api/get-reviews";
import { setReviews } from "../../slices/reviews-slice";
export const useGetReviews = () => { 
    const dispatch = useDispatch();
     const getReviews = async () => {
        const reviews = await getAsyncReviews();
        dispatch(setReviews(reviews));
        return reviews;
      };
  
  return { getReviews}
}
 