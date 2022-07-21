import { Redirect, Link, NavLink } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import burgerLogo from "../../images/logo.svg";

export default function AppHeader() {
  const Header = (props) => {
    return <header className={styles.header}>{props.children}</header>;
  };

  const Logotype = () => {
    return <img src={burgerLogo} className={styles.logo} />;
  };

  const Menu = () => {
    return (
      <nav className={styles.nav}>
        <button className={styles.button} type="button">
          <BurgerIcon type="secondary" />
          <NavLink to="/" activeClassName={styles.activeText} className={styles.text} exact={true}>Конструктор</NavLink>
        </button>
        <button className={styles.button} type="button">
          <ListIcon type="secondary" />
          <NavLink to="/orders" activeClassName={styles.activeText} className={styles.text}>Лента заказов</NavLink>
        </button>
      </nav>
    );
  };

  const MenuItem = () => {
    return (
      <button className={styles.private} type="button">
        <ProfileIcon type="secondary" />
        <NavLink to="/profile" activeClassName={styles.activeText} className={styles.text}>Личный кабинет</NavLink>
      </button>
    );
  };

  return (
    <>
      <Header>
        <Menu />
        <Logotype />
        <MenuItem />
      </Header>
    </>
  );
}
