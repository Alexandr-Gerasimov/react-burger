import React, { useState, useEffect, useRef, FC, ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import InView from "@mpth/react-in-view";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "../../services/store";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";
import { TAuth } from "../../services/types/data";

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      children?: ReactNode
      placeholder?: ReactNode
      ingredient?: ReactNode
    }
  }
}

type TBurgerIngredients = {
  onClick: (component: string[]) => void;
}

export const BurgerIngredients: FC<TBurgerIngredients> = ({ onClick }) => {
  const [currentTab, setCurrentTab] = useState("bun");
  const bunRef = useRef<any>("bun");
  const sauseRef = useRef<any>("sauce");
  const mainRef = useRef<any>("main");
  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab("bun");
    } else if (inViewSauces) {
      setCurrentTab("sauce");
    } else if (inViewFilling) {
      setCurrentTab("main");
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className={styles.button_block}>
        <a href="#bun" className={styles.button}>
          <Tab value="bun" active={currentTab === "bun"} onClick={onTabClick}>
            Булки
          </Tab>
        </a>
        <a href="#sauce" className={styles.button}>
          <Tab
            value="sauce"
            active={currentTab === "sauce"}
            onClick={onTabClick}
          >
            Соусы
          </Tab>
        </a>
        <a href="#main" className={styles.button}>
          <Tab value="main" active={currentTab === "main"} onClick={onTabClick}>
            Начинки
          </Tab>
        </a>
      </div>
      <InView>
        <div className={styles.section}>
          <span ref={bunRef}>
          <span ref={bunsRef}>
          <IngredientsCategory
            title="Булки"
            id="bun"
            ingredientType="bun"
            onClick={onClick}
          />
          </span>
          </span>
          <span ref={sauseRef}>
          <span ref={saucesRef}>
          <IngredientsCategory
            title="Соусы"
            id="sauce"
            ingredientType="sauce"
            onClick={onClick}
          />
          </span>
          </span>
          <span ref={mainRef}>
          <span ref={mainsRef}>
          <IngredientsCategory
            title="Начинки"
            id="main"
            ingredientType="main"
            onClick={onClick}
          />
          </span>
          </span>
        </div>
      </InView>
    </div>
  );
}

BurgerIngredients.propTypes = {
  onClick: PropTypes.func.isRequired,
};
