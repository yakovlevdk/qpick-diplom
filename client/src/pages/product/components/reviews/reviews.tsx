import { useState } from "react";
import Rating from "@mui/material/Rating";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { RootState} from '../../../../store'
import { getCookieToken} from '../../../../utils/get-cookie-token'
import { userType} from '../../../../types/userType'
import { useGetReviews } from "../../../../hooks/use-get-reviews/use-get-reviews";
import { useAddReview } from "../../../../hooks/use-add-review/use-add-review";
import { useParseUser } from "../../../../hooks/use-parse-user/use-parse-user";
interface ReviewsProps { 
  productId: string
}
export const Reviews: React.FC<ReviewsProps> = ({ productId } ) => {
  const { getReviews } = useGetReviews()
  const [value, setValue] = useState<number | null>(null);
  const { handleParseUser} = useParseUser()
  const [content, setContent] = useState("");
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const [cookieValue] = useState(() => getCookieToken()
  );
  const [parsedUser, setParsedUser] = useState<userType | null>(null);
  const { addNewReview} = useAddReview()
  useEffect(() => {
    if( cookieValue) { 
      const user = handleParseUser(cookieValue)
      if( user) { 
        setParsedUser(user)
      }
    }
    getReviews()
  }, []);
  const currentReviews = reviews.filter(
    (rev) => rev["product_id"] === productId
  );

  return (
    <div className="reviews-container">
      <h1>Отзывы</h1>
      {cookieValue && (
        <form>
          <div className="add-review">
            <input
              placeholder="Ваш отзыв..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <button  onClick={() => { 
              if(parsedUser && value ) { 
                addNewReview({parsedUser, value, content, productId})
              }
             }} type="submit" className="otpravit"> 
              Отправить
            </button>
          </div>
        </form>
      )}
      <div className="reviews">
        {currentReviews.map((rev) => {
          return (
            <div className="review" key={rev["_id"]}>
              <div className="review-author">
                <span>{rev["user_name"]}</span>
              </div>
              <Rating value={rev.rate} readOnly />
              <div className="review-content">
                <span>{rev.content}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
