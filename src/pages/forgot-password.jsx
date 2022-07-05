import React, { useCallback, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginRequest } from '../services/api'

export function ForgotPage() {


  const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  const postEmail = async (email) => {
    return await loginRequest(email)
      .then(getResponseData)
      .then(res => {
        if (res.success === true) {
            return (
              <Redirect
                to={{
                  path: "/reset-password"
                }}
              />
            );
          }
        console.log(res.success)
      });
  };


  const [value, setValue] = React.useState({ email: '' });
  console.log(value)
  const inputRef = React.useRef(null);
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <div className={styles.container}>
        <h2 className={styles.header}>Восстановление пароля</h2>
        <form className={styles.form}>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={(e) => setValue(e.target.value)}
            value={value.email}
            name={"email"}
            error={false}
            ref={inputRef}
            size={"default"}
          />
        </form>
        <Button onClick={() => postEmail(value)} type="primary" size="medium">
          Восстановить
        </Button>
        <p>
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
