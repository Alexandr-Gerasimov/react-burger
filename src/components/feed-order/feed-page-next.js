import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import styles from "../../pages/login.module.css";
import OrderItems from "../order-items/order-items";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../ui/loader/loader";

export function FeedPageNext () {

  const orders = useSelector((store) => store.socket.messages)[0];
if (!orders) {
    return <Loader size="large" />
} else {
  const order = orders.data.orders;
    return (
      <div className={styles.feedPage}>
        <div className={styles.feedBlock}>
          <p className={styles.feedTitle}>Лента заказов</p>
          <ul className={styles.feedList}>
            {order.map((obj) => {
              return (
                <React.Fragment key={(obj.id = nanoid())}>
                  <OrderItems data={obj} />
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <div className={styles.feedStatus}>
          <div className={styles.feedProduction}>
            <div className={styles.feedProductionBoard}>
              <p className={styles.feedProductionHead}>Готовы:</p>
              <ul className={styles.feedComplite}>
                {order
                  .filter((obj) => obj.status === "done")
                  .map((obj) => {
                    return (
                      <React.Fragment key={(obj.id = nanoid())}>
                        <li className={styles.feedComplitePos}>{obj.number}</li>
                      </React.Fragment>
                    );
                  })}
              </ul>
            </div>
            <div className={styles.feedProductionBoard}>
              <p className={styles.feedProductionHead}>В работе:</p>
              <ul className={styles.feedComplite}>
                {order
                  .filter((obj) => obj.status === "created")
                  .map((obj) => {
                    return (
                      <React.Fragment key={(obj.id = nanoid())}>
                        <li className={styles.feedComplitePosInWork}>
                          {obj.number}
                        </li>
                      </React.Fragment>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div>
            <p className={styles.feedProductionHead}>Выполнено за все время:</p>
            <p className={styles.feedCompliteAtAll}>{orders.data.total}</p>
          </div>
          <div>
            <p className={styles.feedProductionHead}>Выполнено за сегодня:</p>
            <p className={styles.feedCompliteAtAll}>{orders.data.totalToday}</p>
          </div>
        </div>
      </div>
    );
  }

}