import React, { useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from './order-items.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useAuth } from "../../services/auth";
import { Loader } from "../../ui/loader/loader";

const FeedOrder = (data) => {
  const location = useLocation();

  const allIngredients = useSelector((store) => store.fillings.ingredients);

  useEffect(() => {
  }, [data]);

  const auth = useAuth();

  const order = data.data
  const orderIngredients = data.data.ingredients
  const ingredients = orderIngredients.map((ingredient) => allIngredients.find(item => item._id === ingredient));

  const constructorBuns = ingredients.filter((obj) => obj.type === 'bun')[0]
  const constructorFillings = ingredients.filter((obj) => obj.type !== 'bun')

  const price = useMemo(() => {
    return (
      (constructorBuns === null ? 0 : constructorBuns.price * 2) +
      constructorFillings.reduce((s, v) => s + v.price, 0)
    );
  }, [constructorBuns, constructorFillings]);

  const getDate = (order) => {
    const currentDate = new Date();
    const orderDate = new Date(order.createdAt);
    let dateDiff =  (Math.floor((currentDate - orderDate)/(1000*60*60*24)));
    if (plusDay(currentDate, orderDate)) {
      dateDiff += 1;
    }
    let daysAgo = '';
    if (dateDiff === 0 ) {
      daysAgo = 'Сегодня'
    } else if (dateDiff === 1) {
      daysAgo = 'Вчера'
    } else if (dateDiff < 5) {
      daysAgo = `${dateDiff} дня назад`
    } else {
      daysAgo = `${dateDiff} дней назад`
    }
    const hours = orderDate.getHours() < 10 ? '0' + orderDate.getHours() : orderDate.getHours();
    const minutes = orderDate.getMinutes() < 10 ? '0' + orderDate.getMinutes() : orderDate.getMinutes();
  
    return `${daysAgo}, ${hours}:${minutes} i-GMT+3`
  }

  const plusDay = (currentDate, orderDate) => {
    if (currentDate.getHours() - orderDate.getHours() < 0) {
      return true
    } else if (currentDate.getHours() - orderDate.getHours() > 0) {
      return false
    } else if (currentDate.getMinutes() - orderDate.getMinutes() < 0) {
      return true
    } else {
      return false
    }
  }

  const date = getDate(order)

  if(!data) {
    return <Loader size="large" />
  } else {
  return (
    <li className={styles.order}>
      <Link className={styles.link} to={{
                    pathname: location.pathname === '/feed' ? `/feed/${order._id}` : `/profile/orders/${order._id}`,
                    state: { background: location },
                  }}>
        <div className={styles.orderRow}>
          <p className={styles.orderNumber}>#{order.number}</p>
          <p className={styles.orderTime}>{`${date}`}</p>
        </div>
        <p className={styles.orderText}>{order.name}</p>
        <div className={styles.orderRow}>
          <ul className={styles.ingredients}>
            {ingredients.length <= 6 ?
              (ingredients.map((ingredient, index) => (
                <li key={index} style={{
                  zIndex: ingredients.length + 1 - index,
                  backgroundImage: `url(${ingredient.image})` 
                  }}
                  className={styles.ingredient}>
                </li>
              ))) : (
                ingredients.map((ingredient, index) => {
                  if (index < 5) {
                    return (
                      <li key={index} style={{
                        zIndex: 6 - index,
                        backgroundImage: `url(${ingredient.image})` 
                        }}
                        className={styles.ingredient}>
                      </li>
                    )
                  } else if (index === 5) {
                    return (
                      <li key={index} style={{
                        backgroundImage: `url(${ingredient.image})` 
                        }}
                        className={styles.ingredientLast}>
                          <span className={styles.ingredientPlus}>+{ingredients.length - 6}</span>
                      </li>
                    )
                  }
                })
              )
            }
          </ul>
          <p className={styles.ingredientPrice}>
            {price} &nbsp;
            <CurrencyIcon type="primary"/>
          </p>
        </div>
      </Link>
    </li>
  )
}
}

export default FeedOrder