import React, { useState } from "react";
import styles from "./ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDrag } from 'react-dnd';

export const Ingredient = ({set, onClick, id}) => {

  const [{ opacity }, refff] = useDrag({
    type: 'bun',
    item: { id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <>
      <li className={styles.position} onClick={onClick}>
        <img src={set.image} className={styles.positionImage} />
        <div className={styles.positionPrice}>
          <p className={styles.positionNumber}>{set.price}</p>
          <CurrencyIcon type="primary"  />
        </div>
        <p className={styles.positionText}>{set.name}</p>
      </li>
    </>
  );
}

Ingredient.PropType = {
  set: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClick: PropTypes.func.isRequired
};
