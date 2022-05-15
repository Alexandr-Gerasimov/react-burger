import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

export default function BurgerConstructor({ components }) {
  const ingredient = components.filter(
    (components) => components.type !== "bun"
  );
  const topBun = components.filter(
    (components) => components.name === "Краторная булка N-200i"
  );
  const bottomBun = components.filter(
    (components) => components.name === "Краторная булка N-200i"
  );

  const bunType = ingredient.map((components) => {
    console.log(components)
    return (
      <React.Fragment key={components._id}>
        <li className={styles.position}>
          <DragIcon type="primary" />
          <div className={styles.ingredient}>
            <ConstructorElement
              isLocked={false}
              text={components.name}
              price={components.price}
              thumbnail={components.image}
            />
          </div>
        </li>
      </React.Fragment>
    );
  });

  const bunTop = topBun.map((components) => {
    return (
      <div className={styles.positionTop} key={components._id}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={components.price}
          thumbnail={components.image}
        />
      </div>
    );
  });

  const bunBottom = bottomBun.map((components) => {
    return (
      <div className={styles.positionTop} key={components._id}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={components.price}
          thumbnail={components.image}
        />
      </div>
    );
  });

  const Block = (props) => {
    return <div className={styles.block}>{props.children}</div>;
  };

  const Info = () => {
    return (
      <div className={styles.info}>
        <div className={styles.price}>
          <p className={styles.total}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    );
  };

  return (
    <>
      <Block>
        <div className={styles.construct}>
          {bunTop}
          <ul className={styles.list}>{bunType}</ul>
          {bunBottom}
        </div>
        <Info />
      </Block>
    </>
  );
}

BurgerConstructor.PropType = {
  components: PropTypes.arrayOf(ingredientPropType).isRequired,
};
