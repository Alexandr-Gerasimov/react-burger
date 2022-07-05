import React, { useCallback, useState } from "react";
import { Redirect, Link, NavLink } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
export function ProfilePage() {
  const [reg, setValue] = React.useState({ name: "", email: "", password: "" });
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const onChange = (e) => {
    setValue({ ...reg, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <div className={styles.account}>
        <nav className={styles.navMenu}>
          <NavLink to='/profile' activeClassName={styles.activeNav} className={styles.nav} exact>Профиль</NavLink>
          <NavLink to='/profile/orders' activeClassName={styles.activeNav} className={styles.nav}>История заказов</NavLink>
          <NavLink to='/' className={styles.nav}>Выход</NavLink>
          <p className={styles.caption}>В этом разделе вы можете изменить свои персональные данные</p>
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
          </form>
        </div>
      </div>
    </div>
  );
}
