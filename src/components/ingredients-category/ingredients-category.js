import React from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { Ingredient } from "../ingredient/ingredient";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
} from "react-router-dom";

export const IngredientsCategory = React.forwardRef((props, ref) => {
  const location = useLocation();
  const ingredients = useSelector((store) => store.fillings.ingredients);
  const ingredient = useSelector((store) => store.fillings.ingredient);
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
                <Link
                  className={styles.link}
                  to={{
                    pathname: `/ingredients/${obj.id}`,
                    state: {background: location}
                  }}
                >
                  <Ingredient set={obj} onClick={() => onClick(obj)} />
                </Link>
              </React.Fragment>
            );
          })}
      </ul>
    </>
  );
});
