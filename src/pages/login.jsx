import React, { useCallback, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function LoginPage() {
  const [log, setValue] = React.useState({ email: '', password: '' });
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
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
          <PasswordInput onChange={onChange} value={log.password} name={"password"} />
        </form>
        <Button type="primary" size="medium">
          Войти
        </Button>
        <p>
          Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p>
          Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
}
