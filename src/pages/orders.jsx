import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import { nanoid } from "nanoid";
import styles from "./login.module.css";
import OrderItems from "../components/order-items/order-items";
import { useSelector, useDispatch } from "react-redux";
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSED } from "../services/actions/wsFeedAction";
import { Loader } from "../ui/loader/loader";

export function ProfileOrdersPage(allOrders) {
  const wsConnected = useSelector(
    (store) => store.socketFeed.wsConnected
  );
console.log(allOrders)
  const dispatch = useDispatch();

  useEffect(() => {
    if(!wsConnected) {
      dispatch({type: WS_FEED_CONNECTION_START})
    }
  },[wsConnected])
  useEffect(() => {
    return() => {
      dispatch({type: WS_FEED_CONNECTION_CLOSED})}
  },[])


  const order = allOrders.allOrders.data.orders

  if(!allOrders) {
    return <Loader size="large" />;
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
              <React.Fragment key={(obj.id = nanoid())}>
                <OrderItems data={obj} />
              </React.Fragment>
            );
          })}
          </ul>
        </div>
      </div>
    </div>
  );
}
}
