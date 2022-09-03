import React, { useState, ChangeEvent, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordRequest } from "../services/api";
import { useAuth } from "../services/auth";
import { getResponseData } from "../services/api";
import { useSelector, useDispatch } from "../services/store";
import { StringLiteralLike } from "typescript";

type TForm = {
  password: string;
  code: string;
}

export function ResetPage() {
  const auth: any = useAuth();
  const [form, setValue] = useState<TForm>({ password: "", code: "" });
  const [success, setSuccess] = React.useState<boolean>();
  const inputRef = React.useRef(null);
  const emailSending = useSelector((store) => store.profile.emailSending);

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

  const resetPassword = async (password: string, token: string) => {
    return await resetPasswordRequest(password, token)
      .then(getResponseData)
      .then((res: any) => {
        if (res.success) {
          return setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };

  if (success) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Восстановление пароля</h2>
        <form
          className={styles.form}
          onSubmit={() => resetPassword(form.password, form.code)}
        >
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
            placeholder={"Введите новый пароль"}
          />
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
          <div className={styles.loginButton}>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>

        <p>
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
