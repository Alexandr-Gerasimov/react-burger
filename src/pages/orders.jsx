import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./login.module.css";

export function ProfileOrdersPage() {
  return (
    <div className={styles.wrapper}>
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
