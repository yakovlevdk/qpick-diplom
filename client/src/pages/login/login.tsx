import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./login.scss";
import { Link } from "react-router-dom";
import { loginSchema } from "./login-schema";
import { BreadCrumb } from "primereact/breadcrumb";
import { useLogin} from './hooks/useLogin'
import { items } from './utils/login-items'
 const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error] = useState("");
  const { handleLogin} = useLogin()
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const showPassword = () => {
    setIsShowPassword(true);
    setTimeout(() => {
      setIsShowPassword(false);
    }, 1500);
  };
  return (
    <>
      <div className="login-container">
        <BreadCrumb model={items} />
        <div className="login-pages">
          <h1>Вход</h1>
          <form onSubmit={handleSubmit(() => handleLogin({emailValue, passwordValue}))} className="login-form">
            <input
              placeholder="Почта"
              value={emailValue}
              {...register("email")}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            {errors.email && (
              <span className="error-span">{errors.email.message}</span>
            )}
            <input
              placeholder="Пароль"
              value={passwordValue}
              className="password-input"
              type={isShowPassword ? "text" : "password"}
              {...register("password")}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
               <img
              src="/eyepassword.png"
              className="show-password"
              width={20}
              height={20}
              onClick={showPassword}
            />
            {errors.password && (
              <span className="error-span">{errors.password.message}</span>
            )}
            <button type="submit">Войти</button>
            {error && <span className="error-span">{error}</span>}
          </form>

          <span>
            Ещё не зарегистрированы? <Link to={"/register"}>Регистрация</Link>
          </span>
        </div>
      </div>
    </>
  );
};


export default Login