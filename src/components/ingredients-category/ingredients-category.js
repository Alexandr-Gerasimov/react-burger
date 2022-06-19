import React from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { Ingredient } from "../ingredient/ingredient";

export const IngredientsCategory = React.forwardRef((props, ref) => {
  const ingredients = useSelector((store) => store.fillings.ingredients);
  const { title, id, ingredientType, onClick } = props;
  return (
    <>
      <h2 className={styles.headline} id={id} ref={ref}>
        {title}
      </h2>
      <ul className={styles.list}>
        {ingredients
          .filter((obj) => obj.type === `${ingredientType}`)
          .map((obj) => {
            return (
              <React.Fragment key={(obj.id = nanoid())}>
                <Ingredient
                  set={obj}
                  onClick={() => onClick(obj)}
                />
              </React.Fragment>
            );
          })}
      </ul>
    </>
  );
});
