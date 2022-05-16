import React from "react";
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

export default function BurgerIngredients({ components, onClick }) {
  const Block = (props) => {
    return (
      <div className={styles.block}>
        <h1 className={styles.title}>Соберите бургер</h1>
        {props.children}
      </div>
    );
  };

  const Button = () => {
    return (
      <>
        <button className={styles.button}>Булки</button>
        <button className={styles.button}>Соусы</button>
        <button className={styles.button}>Начинки</button>
      </>
    );
  };

  const Ingredients = () => {
    return (
      <div className={styles.section}>
        <h2 className={styles.headline}>Булки</h2>
        <ul className={styles.list}>
          {components
            .filter((obj) => obj.type === "bun")
            .map((obj) => {
              return (
                <React.Fragment key={obj._id}>
                  <Ingredient set={obj} onClick={() => onClick(obj)}/>
                </React.Fragment>
              );
            })}
        </ul>
        <h2 className={styles.headline}>Соусы</h2>
        <ul className={styles.list}>
          {components
            .filter((obj) => obj.type === "sauce")
            .map((obj) => {
              return (
                <React.Fragment key={obj._id}>
                  <Ingredient set={obj} onClick={() => onClick(obj)}/>
                </React.Fragment>
              );
            })}
        </ul>
        <h2 className={styles.headline}>Начинки</h2>
        <ul className={styles.list}>
          {components
            .filter((obj) => obj.type === "main")
            .map((obj) => {
              return (
                <React.Fragment key={obj._id}>
                  <Ingredient set={obj} onClick={() => onClick(obj)}/>
                </React.Fragment>
              );
            })}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Block>
        <Button />
        <Ingredients />
      </Block>
    </>
  );
}

BurgerIngredients.PropType = {
  components: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClick: PropTypes.func.isRequired
};
