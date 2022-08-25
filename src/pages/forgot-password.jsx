import React, { useEffect, useCallback } from "react";
import { Redirect, Link } from "react-router-dom";
import styles from "./login.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetRequest } from "../services/api";
import { useAuth } from "../services/auth";
import { useDispatch } from "react-redux";
import { EMAIL_SENDING } from "../services/actions/profile";
import { getResponseData } from "../services/api";

export function ForgotPage() {
  const auth = useAuth();
  const [reset, setReset] = React.useState(false);
  const [value, setValue] = React.useState({ email: "" });
  console.log(value);
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();

  let post = useCallback(
    (e) => {
      e.preventDefault();
      postEmail(value.email);
    },
    [value.email]
  );

  if (auth.user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  const postEmail = async (email) => {
    return await resetRequest(email)
      .then(getResponseData)
      .then((res) => {
        if (res.success) {
          console.log(res)
          dispatch({
            type: EMAIL_SENDING,
            emailSending: true,
          });
          return setReset(true);
        }
      })
      .catch((err) => console.log(err));
  };
  

  if (reset) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Восстановление пароля</h2>
        <form className={styles.form} onSubmit={post}>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={onChange}
            value={value.email}
            name={"email"}
            error={false}
            size={"default"}
          />
          <div className={styles.loginButton}>
            <Button type="primary" size="medium">
              Восстановить
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
