import React, { useState, useContext, useMemo, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { nanoid } from 'nanoid'
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

export default function BurgerIngredients({ onClick }) {
  //const ingredients = useContext(BurgerIngredientsContext);
  const ingredients = useSelector((store) => store.fillings.ingredients);
  const itemsRequest = useSelector((state) => state.fillings.itemsRequest);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("bun");
  
  /*
  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab("buns");
    } else if (inViewSauces) {
      setCurrentTab("sauces");
    } else if (inViewFilling) {
      setCurrentTab("mains");
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);
*/

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const onTabClick = (ref) => {
    setCurrentTab(ref);
    console.log(ref)
    const element = ref.current;
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const Block = (props) => {
    return (
      <div className={styles.block}>
        <h1 className={styles.title}>Соберите бургер</h1>
        {props.children}
      </div>
    );
  };

  const IngredientsCategory = React.forwardRef(
    (props, ref) => {
      const { title, ingredientType } = props
      return (
        <>
        <h2 className={styles.headline} ref={ref}>
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
    }
  );

  return (
    <Block>
      <div className={styles.button_block}>
        <a href='#bun' className={styles.button}>
          <Tab value="bun" active={currentTab === "bun"} onClick={() => {onTabClick(bunsRef)}}>
            Булки
          </Tab>
        </a>
        <a href='#sauce' className={styles.button}>
          <Tab
            value="sauce"
            active={currentTab === "sauce"}
            onClick={() => {onTabClick(saucesRef)}}
          >
            Соусы
          </Tab>
        </a>
        <a href='#main' className={styles.button}>
          <Tab
            value="main"
            active={currentTab === "main"}
            onClick={() => {onTabClick(mainsRef)}}
          >
            Начинки
          </Tab>
        </a>
      </div>
      <InView>
        <div className={styles.section}>
          <IngredientsCategory title='Булки' ingredientType='bun' ref={bunsRef}/>
          <IngredientsCategory title='Соусы' ingredientType='sauce' ref={saucesRef}/>
          <IngredientsCategory title='Начинки' ingredientType='main' ref={mainsRef}/>
        </div>
      </InView>
    </Block>
  );
}

BurgerIngredients.PropType = {
  onClick: PropTypes.func.isRequired,
};
