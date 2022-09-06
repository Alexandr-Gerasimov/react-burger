import React, { FC, ReactNode } from "react";
import { Redirect, Link, NavLink, RouteProps } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import burgerLogo from "../../images/logo.svg";

type TProp = { props: ReactNode } & RouteProps

export default function AppHeader() {
  const Header: FC<TProp> = (props) => {
    return <header className={styles.header}>{props.children}</header>;
  };

  const Logotype = () => {
    return (
      <Link to='/'>
        <img src={burgerLogo} className={styles.logo} />
      </Link>
    );
  };

  const Menu = () => {
    return (
      <nav className={styles.nav}>
        <button className={styles.button} type="button">
          <BurgerIcon type="secondary" />
          <NavLink
            to="/"
            activeClassName={styles.activeText}
            className={styles.text}
            exact={true}
          >
            Конструктор
          </NavLink>
        </button>
        <button className={styles.button} type="button">
          <ListIcon type="secondary" />
          <NavLink
            to="/feed"
            activeClassName={styles.activeText}
            className={styles.text}
          >
            Лента заказов
          </NavLink>
        </button>
      </nav>
    );
  };

  const MenuItem = () => {
    return (
      <button className={styles.private} type="button">
        <ProfileIcon type="secondary" />
        <NavLink
          to="/profile"
          activeClassName={styles.activeText}
          className={styles.text}
        >
          Личный кабинет
        </NavLink>
      </button>
    );
  };

  return (
    <>
      <Header props={undefined}>
        <Menu />
        <Logotype />
        <MenuItem />
      </Header>
    </>
  );
}
