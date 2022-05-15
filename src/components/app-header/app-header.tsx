import React from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import burgerLogo from "../../images/logo.svg";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

export default function AppHeader() {
  const Header = (props) => {
    return <header className={styles.header}>{props.children}</header>;
  };

  const Logotype = () => {
    return <img src={burgerLogo} className={styles.logo} />;
  };

  const Menu = (props) => {
    return <nav className={styles.nav}>{props.children}</nav>;
  };

  const MenuItem = () => {
    return (
      <button className={styles.private} type="button">
        <ProfileIcon type="secondary" />
        <p className={styles.text}>Личный кабинет</p>
      </button>
    );
  };

  const ButtonConst = () => {
    return (
      <button className={styles.button} type="button">
        <BurgerIcon type="secondary" />
        <p className={styles.text}>Конструктор</p>
      </button>
    );
  };

  const ButtonOrder = () => {
    return (
      <button className={styles.button} type="button">
        <ListIcon type="secondary" />
        <p className={styles.text}>Лента заказов</p>
      </button>
    );
  };

  return (
    <>
      <Header>
        <Menu>
          <ButtonConst />
          <ButtonOrder />
        </Menu>
        <Logotype />
        <MenuItem />
      </Header>
    </>
  );
}

AppHeader.PropType = {
  components: PropTypes.arrayOf(ingredientPropType).isRequired,
};
