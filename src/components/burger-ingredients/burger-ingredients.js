import React, { useState, useContext, useMemo, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { nanoid } from "nanoid";
import InView from "@mpth/react-in-view";
import styles from "./burger-ingredients.module.css";
import { Ingredient } from "../ingredient/ingredient";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../services/actions";
import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";
import { Loader } from "../../ui/loader/loader";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";

export default function BurgerIngredients({ onClick }) {
  //const ingredients = useContext(BurgerIngredientsContext);
  const ingredients = useSelector((store) => store.fillings.ingredients);
  const itemsRequest = useSelector((state) => state.fillings.itemsRequest);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("bun");

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

  //const bunsRef = useRef(null);
  //const saucesRef = useRef(null);
  //const mainsRef = useRef(null);

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    console.log(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getAllItems());
  }, []);


  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className={styles.button_block}>
        <a href="#bun" className={styles.button}>
          <Tab
            value="bun"
            active={currentTab === "bun"}
            onClick={onTabClick}
          >
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
          <Tab
            value="main"
            active={currentTab === "main"}
            onClick={onTabClick}
          >
            Начинки
          </Tab>
        </a>
      </div>
      <InView>
        <div className={styles.section}>
          <IngredientsCategory
            title="Булки"
            id='bun'
            ingredientType="bun"
            ref={bunsRef}
            onClick={onClick}
          />
          <IngredientsCategory
            title="Соусы"
            id='sauce'
            ingredientType="sauce"
            ref={saucesRef}
            onClick={onClick}
          />
          <IngredientsCategory
            title="Начинки"
            id='main'
            ingredientType="main"
            ref={mainsRef}
            onClick={onClick}
          />
        </div>
      </InView>
    </div>
  );
}

BurgerIngredients.PropType = {
  onClick: PropTypes.func.isRequired,
};
