import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./login.module.css";
import FeedOrder from "../components/order-items/order-items";
import { useSelector } from "react-redux";
import { Loader } from "../ui/loader/loader";

export function ProfileOrdersPage() {

  const orders = useSelector(
    (store) => store.socketFeed.messages
  )[0];
  console.log(orders)
  const order = orders.data.orders
  if(!order) {
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
          <NavLink to="/" className={styles.nav}>
            Выход
          </NavLink>
          <p className={styles.caption}>
            В этом разделе вы можете посмотреть свою историю заказов
          </p>
        </nav>
        <div className={styles.orders}>
          <ul className={styles.orderListStyle}>
            <p>Заказов пока нет</p>
          </ul>
        </div>
      </div>
    </div>
    )
  } else {
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
          <NavLink to="/" className={styles.nav}>
            Выход
          </NavLink>
          <p className={styles.caption}>
            В этом разделе вы можете посмотреть свою историю заказов
          </p>
        </nav>
        <div className={styles.orders}>
          <ul className={styles.orderListStyle}>
          {order.map((obj) => {
            return (
            <FeedOrder data={obj}/>
            )
          })}
          </ul>
        </div>
      </div>
    </div>
  );
}
}
