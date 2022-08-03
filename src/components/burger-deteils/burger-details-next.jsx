import styles from "./burger-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { nanoid } from "nanoid";

function BurgerDetailsNext() {
  const params = useParams();
  const location = useLocation();
  const background = location.state?.background;

  const allOrders = useSelector((store) => store.socket.messages)[0];
  console.log(allOrders) 
  const orders = allOrders.data.orders;
  console.log(orders) 

  const allIngredients = useSelector((store) => store.fillings.ingredients);
  console.log(orders)
  const order = orders.filter((obj) => obj._id === params.id)[0];

  console.log(params)
  console.log(order)

  const orderIngredients = order.ingredients;

  const ingredients = orderIngredients.map((ingredient) =>
    allIngredients.find((item) => item._id === ingredient)
  );

  const ingredientList = [...new Set(ingredients)];
  if (ingredients[0].type === "bun") {
    ingredients.push(ingredients[0]);
  }

  const constructorBuns = ingredients.filter((obj) => obj.type === "bun")[0];
  const constructorFillings = ingredients.filter((obj) => obj.type !== "bun");

  const price = useMemo(() => {
    return (
      (constructorBuns === null ? 0 : constructorBuns.price * 2) +
      constructorFillings.reduce((s, v) => s + v.price, 0)
    );
  }, [constructorBuns, constructorFillings]);

  return (
    <>
      {background ? (
        <>
          <div className={styles.ingredientDetails}>
            <h1 className={styles.ingredientTitle}>{`#${order.number}`}</h1>
            <p className={styles.ingredientName}>{order.name}</p>
            <p className={styles.ingredientStatus}>
              {order.status === "done" ? "Выполнен" : "Выполняется"}
            </p>
            <p className={styles.ingredientComposition}>Состав:</p>
            <ul className={styles.ingredientTypes}>
              {ingredientList.map((ingredient) => {
                const selected = ingredients.filter(
                  (current) => current._id === ingredient._id
                );
                const counter = selected.length;
                return (
                  <li
                    className={styles.ingredientPosition}
                    key={(ingredient.id = nanoid())}
                  >
                    <div className={styles.ingredientPositionDescription}>
                      <image
                        className={styles.ingredientImage}
                        style={{
                          backgroundImage: `url(${ingredient.image})`,
                        }}
                        src={ingredient.image}
                        alt={ingredient.name}
                      />
                      <p className={styles.ingredientPositionText}>
                        {ingredient.name}
                      </p>
                    </div>
                    <div className={styles.ingredientPositionPrice}>
                      <p className={styles.ingredientPositionPriceText}>
                        {counter} x {ingredient.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.ingredientOrderDetails}>
              <p className={styles.ingredientOrderTime}>Вчера, 13:50 i-GMT+3</p>
              <div className={styles.ingredientOrderPrice}>
                <p className={styles.ingredientOrderPriceText}>{price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.ingredientDetails}>
            <h1 className={styles.ingredientTitle}>{`#${order.number}`}</h1>
            <p className={styles.ingredientName}>{order.name}</p>
            <p className={styles.ingredientStatus}>
              {order.status === "done" ? "Выполнен" : "Выполняется"}
            </p>
            <p className={styles.ingredientComposition}>Состав:</p>
            <ul className={styles.ingredientTypes}>
              {ingredientList.map((ingredient) => {
                const selected = ingredients.filter(
                  (current) => current._id === ingredient._id
                );
                const counter = selected.length;
                return (
                  <li
                    className={styles.ingredientPosition}
                    key={(ingredient.id = nanoid())}
                  >
                    <div className={styles.ingredientPositionDescription}>
                      <image
                        className={styles.ingredientImage}
                        style={{
                          backgroundImage: `url(${ingredient.image})`,
                        }}
                        src={ingredient.image}
                        alt={ingredient.name}
                      />
                      <p className={styles.ingredientPositionText}>
                        {ingredient.name}
                      </p>
                    </div>
                    <div className={styles.ingredientPositionPrice}>
                      <p className={styles.ingredientPositionPriceText}>
                        {counter} x {ingredient.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.ingredientOrderDetails}>
              <p className={styles.ingredientOrderTime}>Вчера, 13:50 i-GMT+3</p>
              <div className={styles.ingredientOrderPrice}>
                <p className={styles.ingredientOrderPriceText}>{price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

BurgerDetailsNext.PropType = {
  component: ingredientPropType.isRequired,
};

export default BurgerDetailsNext;
