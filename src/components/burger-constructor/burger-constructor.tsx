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

export default function BurgerConstructor({ components, onClick }) {
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
        <Button type="primary" size="large" onClick={onClick}>
          Оформить заказ
        </Button>
      </div>
    );
  };

  return (
    <>
      <Block>
        <div className={styles.construct}>
          {components
            .filter(
              (components) => components.name === "Краторная булка N-200i"
            )
            .map((components) => {
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
            })}
          <ul className={styles.list}>
            {components
              .filter((components) => components.type !== "bun")
              .map((components) => {
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
              })}
          </ul>
          {components
            .filter(
              (components) => components.name === "Краторная булка N-200i"
            )
            .map((components) => {
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
            })}
        </div>
        <Info />
      </Block>
    </>
  );
}

BurgerConstructor.PropType = {
  components: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClick: PropTypes.func.isRequired
};
