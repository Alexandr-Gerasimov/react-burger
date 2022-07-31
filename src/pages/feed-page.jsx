import React, {useEffect} from "react";
import styles from "./login.module.css";
import FeedOrder from "../components/order-items/order-items";
import { useSelector, useDispatch } from "react-redux";
import { WS_CONNECTION_START } from '../services/actions/wsOrdersAction';

export function FeedPage() {
  const orders = useSelector(
    (store) => store.socket.messages
  )[0];
  const dispatch = useDispatch();
  useEffect(() => {
  }, [orders]);
  const order = orders.data.orders
  return (
    <div className={styles.feedPage}>
      <div className={styles.feedBlock}>
        <p className={styles.feedTitle}>Лента заказов</p>
        <ul className={styles.feedList}>
          {order.map((obj) => {
            return (
            <FeedOrder data={obj}/>
            )
          })}
        </ul>
      </div>
      <div className={styles.feedStatus}>
        <div className={styles.feedProduction}>
          <div className={styles.feedProductionBoard}>
            <p className={styles.feedProductionHead}>Готовы:</p>
            <ul className={styles.feedComplite}>
              {order
              .filter((obj) => obj.status === 'done')
              .map((obj) => {
                return (
                  <li className={styles.feedComplitePos}>{obj.number}</li>
                )
              })}
            </ul>
          </div>
          <div className={styles.feedProductionBoard}>
            <p className={styles.feedProductionHead}>В работе:</p>
            <ul className={styles.feedComplite}>
              {order
              .filter((obj) => obj.status === 'created')
              .map((obj) => {
                return (
                  <li className={styles.feedComplitePosInWork}>{obj.number}</li>
                )
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
