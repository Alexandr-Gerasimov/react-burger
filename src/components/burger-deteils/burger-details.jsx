import styles from "./burger-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Loader } from "../../ui/loader/loader";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";

const BurgerDetails = () => {
  const params = useParams()
  const allIngredients = useSelector((store) => store.fillings.ingredients);
  const allOrders = useSelector(
    (store) => store.socket.messages
  )[0];

  const orders = allOrders.data.orders

  const order = orders.filter((obj) => obj._id === params.id)[0]

  const orderIngredients = order.ingredients

  console.log(order)

  const location = useLocation();
  const background = location.state?.background;

  const ingredients = orderIngredients.map((ingredient) => allIngredients.find(item => item._id === ingredient));
  const constructorBuns = ingredients.filter((obj) => obj.type === 'bun')[0]
  const constructorFillings = ingredients.filter((obj) => obj.type !== 'bun')

  const price = useMemo(() => {
    return (
      (constructorBuns === null ? 0 : constructorBuns.price * 2) +
      constructorFillings.reduce((s, v) => s + v.price, 0)
    );
  }, [constructorBuns, constructorFillings]);


  if (!allOrders) {
    return <Loader size="large" />;
  } else {
    return (
      <>
        {background ? (
          <>
            <div className={styles.ingredientDetails}>
              <h1 className={styles.ingredientTitle}>{`#${order.number}`}</h1>
              <p className={styles.ingredientName}>{order.name}</p>
              <p className={styles.ingredientStatus}>Выполнен</p>
              <p className={styles.ingredientComposition}>Состав:</p>
              <ul className={styles.ingredientTypes}>
                {ingredients.map((item) => (
                  <li className={styles.ingredientPosition}>
                    <div className={styles.ingredientPositionDescription}>
                    <image
                      className={styles.ingredientImage}
                      style={{
                        backgroundImage: `url(${item.image})` 
                        }}
                      src={item.image}
                      alt={item.name}
                    />
                    <p className={styles.ingredientPositionText}>
                      {item.name}
                    </p>
                    </div>
                    <div className={styles.ingredientPositionPrice}>
                    <p className={styles.ingredientPositionPriceText}>{item.price}</p>
                    <CurrencyIcon type="primary"/>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.ingredientOrderDetails}>
                <p className={styles.ingredientOrderTime}>Вчера, 13:50 i-GMT+3</p>
                <div className={styles.ingredientOrderPrice}>
                  <p className={styles.ingredientOrderPriceText}>{price}</p>
                  <CurrencyIcon type="primary"/>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.ingredientDetails}>
              <h1 className={styles.ingredientTitle}>{order.number}</h1>
              <p className={styles.ingredientName}>{order.name}</p>
              <p className={styles.ingredientName}>Выполнен</p>
              <p className={styles.ingredientName}>Состав:</p>
              <ul className={styles.ingredientEnergyValue}>
                {ingredients.map((item) => (
                  <li className={styles.ingredientEnergyValueType}>
                    <image
                      className={styles.ingredientImage}
                      src={item.image}
                      alt={item.name}
                    />
                    <p className={styles.ingredientEnergyValueTitle}>
                      {item.name}
                    </p>
                    <p className={styles.ingredientEnergyValueTitle}>
                      {item.price}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </>
    );
  }
};

BurgerDetails.PropType = {
  component: ingredientPropType.isRequired,
};

export default BurgerDetails;
