import React, { ReactNode } from "react";
import { nanoid } from "nanoid";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { Ingredient } from "../ingredient/ingredient";
import { Link, useLocation, RouteProps } from "react-router-dom";
import { TIngredientsCategory } from "../../services/types/data";
import { FC } from "react";
import { useSelector } from "../../services/store";


export const IngredientsCategory: FC<TIngredientsCategory> = (props) => {
  const ref = React.useRef<HTMLHeadingElement>(null);
  const location = useLocation();
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
          .map((obj: any) => {
            return (
              <React.Fragment key={(obj.id = nanoid())}>
                <Link
                  className={styles.link}
                  to={{
                    pathname: `/ingredients/${obj._id}`,
                    state: { background: location },
                  }}
                >
                  <Ingredient set={obj} onClick={() => onClick()} />
                </Link>
              </React.Fragment>
            );
          })}
      </ul>
    </>
  );
};