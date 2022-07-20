import React, { useCallback, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from "../services/auth";

export function LoginPage() {
  const auth = useAuth();
  const [log, setValue] = React.useState({ email: "", password: "" });
  const inputRef = React.useRef(null);

  let login = useCallback(
    (e) => {
      e.preventDefault();
      auth.signIn(log);
    },
    [auth, log]
  );

  const init = async () => {
    return await auth.getUser();
  };

  useEffect(() => {
    init();
  });
  const address = JSON.parse(localStorage.getItem("lastAddress"))
  const nextAddress = address.from.pathname

  if (auth.user) {
    return (
      <Redirect
        to={nextAddress}
      />
    );
  }

  const onChange = (e) => {
    setValue({ ...log, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Вход</h2>
        <form className={styles.form} onSubmit={login}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={onChange}
            value={log.email}
            name={"email"}
            error={false}
            ref={inputRef}
            size={"default"}
          />
          <PasswordInput
            onChange={onChange}
            value={log.password}
            name={"password"}
          />
          <div className={styles.loginButton}>
          <Button type="primary" size="medium">
            Войти
          </Button>
          </div>
        </form>

        <p>
          Вы - новый пользователь?{" "}
          <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p>
          Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
}
