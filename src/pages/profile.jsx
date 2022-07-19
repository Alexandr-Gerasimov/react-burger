import React, { useCallback, useState } from "react";
import { Redirect, Link, NavLink, useHistory, useLocation } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserRequest } from "../services/api";
import { useAuth } from "../services/auth";
import { getCookie } from "../services/utils";

export function ProfilePage() {
  const location = useLocation();
  
  const auth = useAuth();
  const [reg, setValue] = React.useState({
    name: auth.user.name,
    email: auth.user.email,
    password: auth.password,
  });
  const [click, setClick] = React.useState(false)
  const inputRef = React.useRef(null);
  const history = useHistory();
  const logout = useCallback(
    () => {
      auth.signOut().then(() => {
        history.replace({ pathname: '/login' });
      });
    },
    [auth, history]
  );

  const cancelChanges = (e) => {
    e.preventDefault();
    setValue({ name: auth.user.name, email: auth.user.email });
  };

  const refreshUs = (name, email) => {
    auth.refreshUser(name, email)
  } 

  const onChange = (e) => {
    setValue({ ...reg, [e.target.name]: e.target.value });
  };


  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <div className={styles.account}>
        <nav className={styles.navMenu}>
          <NavLink
            to="/profile"
            activeClassName={styles.activeNav}
            className={styles.nav}
            exact
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            activeClassName={styles.activeNav}
            className={styles.nav}
          >
            История заказов
          </NavLink>
          <button onClick={logout} className={styles.nav}>
            Выход
          </button>
          <p className={styles.caption}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>
        <div className={styles.redAccount}>
          <form className={styles.navForm}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={reg.name}
              icon={"EditIcon"}
              name={"name"}
              error={false}
              ref={inputRef}
              size={"default"}
            />
            <Input
              type={"email"}
              placeholder={"Логин"}
              onChange={onChange}
              value={reg.email}
              icon={"EditIcon"}
              name={"email"}
              error={false}
              ref={inputRef}
              size={"default"}
            />
            <Input
              type={"text"}
              placeholder={"Пароль"}
              onChange={onChange}
              value={reg.password}
              icon={"EditIcon"}
              name={"password"}
              error={false}
              ref={inputRef}
              size={"default"}
            />
            <div className={styles.profileButtons}>
            <button className={styles.cancelButton} onClick={cancelChanges}>Отмена</button>
            <Button onSubmit={refreshUs(reg.name, reg.email)}>Сохранить</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
