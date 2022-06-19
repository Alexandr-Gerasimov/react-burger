import styles from "./ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

export const Ingredient = ({ set, onClick }) => {
  const ingredientCount = set.__v;
  const [{ opacity }, dragRef] = useDrag({
    type: "bun",
    item: { set },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <>
      <li
        ref={dragRef}
        className={styles.position}
        style={{ opacity }}
        onClick={onClick}
      >
        {ingredientCount !== 0 ? (
          <Counter count={ingredientCount} size="small" />
        ) : (
          <Counter count={null} size="undefined" />
        )}
        <img src={set.image} className={styles.positionImage} />
        <div className={styles.positionPrice}>
          <p className={styles.positionNumber}>{set.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.positionText}>{set.name}</p>
      </li>
    </>
  );
};

Ingredient.PropType = {
  set: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClick: PropTypes.func.isRequired,
};
