import React, { useEffect, useCallback} from "react";
import { NavLink, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import styles from "../../pages/login.module.css";
import OrderItems from "../order-items/order-items";
import { Loader } from "../../ui/loader/loader";
import { useAuth } from "../../services/auth";
import { useSelector } from "../../services/store";
import { TWSFeed, TWSFeedOrder } from "../../services/types/data";

export function ProfileOrdersPageNext() {
  const auth: any = useAuth();
  const history = useHistory();
  const orders = useSelector((store) => store.socket.orders);

  const logout = useCallback(() => {
    auth.signOut().then(() => {
      history.replace({ pathname: "/login" });
    });
  }, [auth, history]);

  if(!orders) {
    return <Loader size="large" />;
  } else {
    const order = orders
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
