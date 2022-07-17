import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordRequest } from "../services/api";
import { useAuth } from "../services/auth";
import { useSelector } from "react-redux";

export function ResetPage() { 
  const auth = useAuth();
  const [form, setValue] = useState({ password: '', code: '' });
  const [success, setSuccess] = React.useState()
  const inputRef = React.useRef(null);
  const emailSending = useSelector((store) => store.profile.emailSending);

  console.log(emailSending)

  const init = async () => {
    return await auth.getUser();
  };

  useEffect(() => {
    init()
  }, []);

  if (!emailSending) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  if (auth.user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  
  const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  const resetPassword = async (password, token) => {
    return await resetPasswordRequest(password, token)
      .then(getResponseData)
      .then(res => {
        if (res.success) {
          return setSuccess(true)
          }
      })
  };

  if (success) {
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  }

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
            name={"code"}
            error={false}
            ref={inputRef}
            size={"default"}
          />
        </form>
        <Button type="primary" size="medium" onClick={() => resetPassword(form.password, form.code)}>
          Сохранить
        </Button>
        <p>
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
