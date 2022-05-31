import React, { useState, useContext, useMemo } from "react";
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";

export default function BurgerIngredients({ onClick }) {
  const ingredients = useContext(BurgerIngredientsContext);
  const Block = (props) => {
    return (
      <div className={styles.block}>
        <h1 className={styles.title}>Соберите бургер</h1>
        {props.children}
      </div>
    );
  };

  return (
    <Block>
      <button className={styles.button}>Булки</button>
      <button className={styles.button}>Соусы</button>
      <button className={styles.button}>Начинки</button>
      <div className={styles.section}>
        <h2 className={styles.headline}>Булки</h2>
        <ul className={styles.list}>
          {ingredients
            .filter((obj) => obj.type === "bun")
            .map((obj) => {
              return (
                <React.Fragment key={obj._id}>
                  <Ingredient set={obj} onClick={() => onClick(obj)} />
                </React.Fragment>
              );
            })}
        </ul>
        <h2 className={styles.headline}>Соусы</h2>
        <ul className={styles.list}>
          {ingredients
            .filter((obj) => obj.type === "sauce")
            .map((obj) => {
              return (
                <React.Fragment key={obj._id}>
                  <Ingredient set={obj} onClick={() => onClick(obj)} />
                </React.Fragment>
              );
            })}
        </ul>
        <h2 className={styles.headline}>Начинки</h2>
        <ul className={styles.list}>
          {ingredients
            .filter((obj) => obj.type === "main")
            .map((obj) => {
              return (
                <React.Fragment key={obj._id}>
                  <Ingredient set={obj} onClick={() => onClick(obj)} />
                </React.Fragment>
              );
            })}
        </ul>
      </div>
    </Block>
  );
}

BurgerIngredients.PropType = {
  onClick: PropTypes.func.isRequired,
};
