import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookieToken } from "../../../../utils/get-cookie-token";
import { useHandleUserClick } from "./hooks/use-handle-user-click";
export const HeaderPanel: React.FC = () => {
  const counter = useSelector((state) => state.userBasket.counter);
  const { handleUserClick } = useHandleUserClick();
  const favorites: string | [] = JSON.parse(localStorage.getItem("favorites")) || [];
  const cookieValue = getCookieToken();

  return (
    <div className="header-panel">
      <Link to={"/favorites"}>
        <div className="header-panel-like">
          <img src="/heart.png" className="header-panel-mvp-img" width={25} />
          {favorites.length > 0 && (
            <div>
              <img src="/ellipse.svg" className="header-panel-counter-img" />
              <span className="header-panel-counter-span">
                {favorites.length}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="header-panel-basket">
        <Link to={"/basket"}>
          <img src="/bask.png" width={25} className="header-panel-mvp-img" />
          {counter > 0 && (
            <>
              <img src="/ellipse.svg" className="header-panel-counter-img" />
            </>
          )}
        </Link>
      </div>

      <div className="header-panel-user-img">
        <img
          src="/ava.png"
          width={25}
          onClick={() => handleUserClick(!!cookieValue)}
        />
      </div>
    </div>
  );
};
