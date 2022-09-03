import styles from "./order-details.module.css";
import orderLogo from "../../images/done.svg";
import PropTypes from "prop-types";
import { FC } from "react";
import { TOrder, TOrderDetails } from "../../services/types/data";
import { RouteProps }  from 'react-router-dom';


const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={styles.orderDetails}>
      <h1 className={styles.orderTitle}>{orderNumber}</h1>
      <p className={styles.orderMainText}>идентификатор заказа</p>
      <img className={styles.orderImage} src={orderLogo} />
      <p className={styles.orderText}>Ваш заказ начали готовить</p>
      <p className={styles.orderMessage}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.string.isRequired,
};

export default OrderDetails;
