import React, { useCallback, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { LOG_USER_PROFILE_SUCCESS } from "../services/actions/profile";
import { loginRequest } from "../services/api";
import { setCookie } from "../services/utils";
import { useAuth } from "../services/auth";

export function LoginPage() {
  const [log, setValue] = React.useState({ email: "", password: "" });
  const inputRef = React.useRef(null);
  const auth = useAuth();

  let login = useCallback(
    e => {
      e.preventDefault();
      auth.signIn(log);
    },
    [auth, log]
  );

  if (auth.user) {
    return (
      <Redirect
        to={{
          path: "/",
        }}
      />
    );
  }

  const onChange = (e) => {
    setValue({ ...log, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <div className={styles.container}>
        <h2 className={styles.header}>Вход</h2>
        <form className={styles.form}>
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
        </form>
        <Button type="primary" size="medium" onClick={login}>
          Войти
        </Button>
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
