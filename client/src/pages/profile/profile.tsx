import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import "./profile.scss";
import { getCookieToken } from "../../utils/get-cookie-token";
import { useEffect, useState } from "react";
import { setProfileInfo } from "../../api/set-profile-info";
import { BreadCrumb } from "primereact/breadcrumb";
import { useGetParsedUser } from "../../hooks/use-get-parsed-user/use-get-parsed-user";
import { userType} from '../../types/userType'
export const Profile = () => {
  const [nameInfo, setNameInfo] = useState("");
  const [countryInfo, setCountryInfo] = useState("");
  const [showChangeInfoForm, setShowChangeInfoForm] = useState(false);
  const navigate = useNavigate();
  const [parsedUser, setParsedUser] = useState<userType | null>(null);
  const { handleGetParsedUser } = useGetParsedUser();
  const items = [
    { label: "Главная", url: "/" },
    { label: "Личный кабинет", url: "/profile" },
  ];
  const [cookie] = useState(() => getCookieToken());
  const fetchUserData = async () => {
    if (!cookie) {
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const parsed= handleGetParsedUser(cookie);
    if ( parsed) { 
      setParsedUser(parsed);

    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  const handleSaveInfo = async () => {
    if (nameInfo && countryInfo && parsedUser) {
      await setProfileInfo(parsedUser.id, nameInfo, countryInfo);
      await fetchUserData();
      location.reload();
    }
  };

  const logout = () => {
    const fetchLogout = async () => {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.status === 401) {
        navigate("/login");
        return;
      }
    };
    fetchLogout();
  };

  const onSaveChanges = () => {
    handleSaveInfo();
    setShowChangeInfoForm(false);
  };
  return (
    <>
      <Header />
      <BreadCrumb model={items} />
      <div className="for-mobile">
        {parsedUser ? (
          <div className="profile-container">
            <h1>Личный кабинет</h1>
            <div className="profile-pages">
              <div className="profile-pages-div">
                <div className="profile-data">
                  <h2>Ваши данные</h2>
                  <div className="profile-data-info">
                    <span>Ваша почта: {parsedUser.email}</span>
                    {parsedUser.name && (
                      <span>Ваше имя: {parsedUser.name}</span>
                    )}
                    {parsedUser.country && (
                      <span>Ваша страна: {parsedUser.country}</span>
                    )}
                    {parsedUser.name && (
                      <button
                        onClick={() =>
                          setShowChangeInfoForm(!showChangeInfoForm)
                        }
                      >
                        Изменить
                      </button>
                    )}
                    {showChangeInfoForm && (
                      <div className="profile-add-info">
                        <input
                          placeholder="Новое имя"
                          value={nameInfo}
                          onChange={(e) => setNameInfo(e.target.value)}
                        />
                        <input
                          placeholder="Новая страна"
                          value={countryInfo}
                          onChange={(e) => setCountryInfo(e.target.value)}
                        />
                        <button onClick={onSaveChanges}>
                          Сохранить изменения
                        </button>
                      </div>
                    )}
                  </div>

                  {!parsedUser.name && !parsedUser.country && (
                    <div className="profile-add-info">
                      <h2>Дополните информацию о себе</h2>
                      <input
                        placeholder="Ваше имя..."
                        value={nameInfo}
                        onChange={(e) => setNameInfo(e.target.value)}
                      />
                      <input
                        placeholder="Страна проживания"
                        value={countryInfo}
                        onChange={(e) => setCountryInfo(e.target.value)}
                      />
                      <button onClick={handleSaveInfo}>Сохранить</button>
                    </div>
                  )}
                </div>
                <div className="profile-buttons">
                  <Link to={"/basket"}>
                    <button>Перейти в корзину</button>
                  </Link>

                  <Link to={"/catalog"}>
                    {" "}
                    <button>Перейти в каталог</button>{" "}
                  </Link>
                  <Link to={"/favorites"}>
                    {" "}
                    <button>Перейти в избранное</button>{" "}
                  </Link>
                  {parsedUser?.role === "admin" && (
                    <Link to={"/adminpanel"}>
                      <button>Админ-панель</button>
                    </Link>
                  )}
                  <button onClick={logout}>Выйти</button>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        ) : (
          <div className="not-login">
            <h1>Ошибка!</h1>
            <h2>Вы ещё не вошли в свой аккаунт. Редирект на страницу входа.</h2>
          </div>
        )}
      </div>
    </>
  );
};
