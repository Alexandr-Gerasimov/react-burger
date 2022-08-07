import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { GET_USER_PROFILE_SUCCESS } from "../services/actions/profile";
import { newUserRequest } from "../services/api";
import { setCookie } from "../services/utils";
import { useAuth } from "../services/auth";
import { getResponseData } from "../services/api";

export function RegisterPage() {
  const auth = useAuth();
  const [reg, setValue] = React.useState({ name: "", email: "", password: "" });
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();

  const newUser = (data) => {
    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      data,
    });
  };
  
  const postEmail = async (name, email, password) => {
    return await newUserRequest(name, email, password)
      .then(getResponseData)
      .then((res) => {
        let authToken;
        res.headers.forEach((header) => {
          if (header.indexOf("Bearer") === 0) {
            authToken = header.split("Bearer")[1];
          }
        });
        if (authToken) {
          setCookie("token", authToken);
        }
        return res.json();
      })
      .then((data) => newUser(data))
      .catch((err) => console.log(err));
  };

  if (auth.user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  const onChange = (e) => {
    setValue({ ...reg, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Регистрация</h2>
        <form
          className={styles.form}
          onSubmit={() => postEmail(reg.name, reg.email, reg.password)}
        >
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
          <div className={styles.loginButton}>
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </div>
        </form>

        <p>
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
