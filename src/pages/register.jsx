import React, { useCallback, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
} from "../services/actions/profile";
import { newUserRequest } from "../services/api";

export function RegisterPage() {
  const [reg, setValue] = React.useState({ name: "", email: "", password: "" });
  const inputRef = React.useRef(null);
  const registrationSuccess = useSelector((store) => store.profile.registrationSuccess);
  const dispatch = useDispatch();

  const newUser = (data) => {
    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      data,
    });
  };

  const postEmail = async (name, email, password) => {
    return await newUserRequest(name, email, password)
      .then((res) => res.json())
      .then((data) => newUser(data));
  };

  if (registrationSuccess) {
    return (
      <Redirect
        to={{
          path: "/",
        }}
      />
    );
  }

  const onChange = (e) => {
    setValue({ ...reg, [e.target.name]: e.target.value });
  };
  
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <div className={styles.container}>
        <h2 className={styles.header}>Регистрация</h2>
        <form className={styles.form}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={reg.name}
            name={"name"}
            error={false}
            ref={inputRef}
            size={"default"}
          />
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={onChange}
            value={reg.email}
            name={"email"}
            error={false}
            ref={inputRef}
            size={"default"}
          />
          <PasswordInput
            onChange={onChange}
            value={reg.password}
            name={"password"}
          />
        </form>
        <Button
          type="primary"
          size="medium"
          onClick={() => postEmail(reg.name, reg.email, reg.password)}
        >
          Зарегистрироваться
        </Button>
        <p>
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
