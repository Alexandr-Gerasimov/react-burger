import React, { FC, useCallback, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "../services/store";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import styles from "./login.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from "../services/auth";
import { WS_FEED_CONNECTION_START } from "../services/actions/wsFeedAction";
import { TProfile, TAuth } from "../services/types/data";

export function ProfilePage() {
  const auth: TAuth | undefined = useAuth();
  console.log(auth)
  const [reg, setValue] = React.useState<TProfile>({
    name: auth!.user!.name,
    email: auth!.user!.email,
  });
  const dispatch = useDispatch();

  const [password, setPassword] = React.useState("");
  const inputRef = React.useRef(null);
  const history = useHistory();
  const logout = useCallback(() => {
    auth!.signOut().then(() => {
      history.replace({ pathname: "/login" });
    });
  }, [auth, history]);

  const cancelChanges = () => {
    setValue({ name: auth!.user!.name, email: auth!.user!.email });
  };

  const refreshUs = (e: FormEvent): void => {
    e.preventDefault();
    return auth!.refreshUser(reg.name, reg.email);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...reg, [e.target.name]: e.target.value });
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (!auth!.user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.wrapper}>
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
          <form
            className={styles.navForm}
            onSubmit={refreshUs}
          >
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
            <PasswordInput
              onChange={onChangePassword}
              value={password}
              name={"password"}
            />
            <div className={styles.profileButtons}>
              <button className={styles.cancelButton} onClick={cancelChanges}>
                Отмена
              </button>
              <Button>Сохранить</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
