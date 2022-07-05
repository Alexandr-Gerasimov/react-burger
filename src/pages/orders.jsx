import React, { useCallback, useState } from "react";
import { Redirect, Link, NavLink } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { newUserRequest } from "../services/api";

export function ProfileOrdersPage() {
  const [reg, setValue] = React.useState({ name: "", email: "", password: "" });
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const onChange = (e) => {
    setValue({ ...reg, [e.target.name]: e.target.value });
  };
  console.log(reg);
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
          
        </div>
      </div>
    </div>
  );
}
