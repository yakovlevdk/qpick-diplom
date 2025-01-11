import { useState } from "react";
import "./register.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BreadCrumb } from "primereact/breadcrumb";
import { Link } from "react-router-dom";
import { validationSchema} from './utils/register-schema'
import { useRegister } from './utils/handle-register'
import { items} from './utils/breadcrumbs-items'
 const Register = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { handleRegister } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const showPassword = () => {
    setIsShowPassword(true);
    setTimeout(() => {
      setIsShowPassword(false);
    }, 1500);
  };
  return (
    <>
      <div className="register-container">
        <BreadCrumb model={items} />
        <div className="register-pages">
          <h1>Регистрация</h1>
          <form
            onSubmit={handleSubmit(() => handleRegister({emailValue, passwordValue}))}
            className="register-form"
          >
            <input
              placeholder="Почта"
              {...register("email")}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            {errors.email && (
              <span className="error-span">{errors.email.message}</span>
            )}
            <input
              placeholder="Пароль"
              {...register("password")}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              className="password-input"
              type={isShowPassword ? "text" : "password"}
            />
            <img
              src="/eyepassword.png"
              className="show-password"
              width={20}
              height={20}
              onClick={showPassword}
            />

            {errors.password && (
              <span className="error-span"> {errors.password.message}</span>
            )}
            <button type="submit">Зарегистрироваться</button>
          </form>
          <span>
            Уже зарегистрированы? <Link to={"/login"}>Войти</Link>
          </span>
        </div>
      </div>
    </>
  );
};


export default Register