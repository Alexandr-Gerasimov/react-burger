import styles from './order-details.module.css'
import orderLogo from "../../images/done.svg";

const OrderDetails = () => {
  return (
    <div className={styles.orderDetails}>
      <h1 className={styles.orderTitle}>034536</h1>
      <p className={styles.orderMainText}>идентификатор заказа</p>
      <img className={styles.orderImage} src={orderLogo}/>
      <p className={styles.orderText}>Ваш заказ начали готовить</p>
      <p className={styles.orderMessage}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails