import React, { useCallback, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordRequest } from "../services/api";

export function ResetPage() {
  const [form, setValue] = useState({ password: '', code: '' });
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  console.log(form.password)
  const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  const resetPassword = async (password) => {
    return await resetPasswordRequest(password)
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

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <div className={styles.container}>
        <h2 className={styles.header}>Восстановление пароля</h2>
        <form className={styles.form}>
          <PasswordInput onChange={onChange} value={form.password} name={"password"} placeholder={"Введите новый пароль"} />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={form.code}
            name={"name"}
            error={false}
            ref={inputRef}
            size={"default"}
          />
        </form>
        <Button type="primary" size="medium" onClick={() => resetPassword(form.password)}>
          Сохранить
        </Button>
        <p>
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
