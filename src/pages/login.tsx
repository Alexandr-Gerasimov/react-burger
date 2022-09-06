import React, { useCallback, ChangeEvent, FormEvent } from "react";
import { Redirect, Link, useLocation } from "react-router-dom";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from "../services/auth";
import { TLocationState, TLog, TAuth } from "../services/types/data";

export interface ILocation {
  from?: Location;
  background?: Location;
  pathname?: string;
}

export function LoginPage() {
  const location = useLocation<ILocation>();
  const auth: TAuth | undefined = useAuth();
  const [log, setValue] = React.useState<TLog>({ email: "", password: "" });
  const inputRef = React.useRef(null);
  console.log(location)

  const login = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      auth!.signIn(log.email, log.password);
    },
    [auth, log]
  );
  
  if (auth!.user) {
    return (<Redirect
        to={location?.state?.from || '/'}
      />)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
