import React, { useState } from "react";
import styles from "./ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

export default function Ingredient({ set, onClick }) {
  return (
    <>
      <li className={styles.position} onClick={onClick}>
        <img src={set.image} className={styles.positionImage} />
        <div className={styles.positionPrice}>
          <p className={styles.positionNumber}>{set.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.positionText}>{set.name}</p>
      </li>
    </>
  );
}

Ingredient.PropType = {
  set: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClick: PropTypes.func.isRequired,
};
