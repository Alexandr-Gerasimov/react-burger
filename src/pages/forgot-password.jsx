import React, { useEffect } from "react";
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
  const [reset, setReset] = React.useState();
  const [value, setValue] = React.useState({ email: "" });
  console.log(value);
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();

  const init = async () => {
    return await auth.getUser();
  };

  useEffect(() => {
    init();
  });

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
          dispatch({
            type: EMAIL_SENDING,
            payload: true,
          });
          return setReset(true);
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(reset);

  if (reset) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }

  console.log(reset);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Восстановление пароля</h2>
        <form className={styles.form} onSubmit={() => postEmail(value)}>
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
