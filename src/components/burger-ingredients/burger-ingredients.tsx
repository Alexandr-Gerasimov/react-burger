import React, { useState } from "react";
import styles from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

export default function BurgerIngredients({ components }) {
  const [arr, setArr] = useState(components);

  const bun = arr.filter((obj) => obj.type === "bun");
  const sauce = arr.filter((obj) => obj.type === "sauce");
  const main = arr.filter((obj) => obj.type === "main");

  const BunType = bun.map((obj) => {
    return (
      <React.Fragment key={obj._id}>
        <Puns set={obj} />
      </React.Fragment>
    );
  });

  const SauceType = sauce.map((obj) => {
    return (
      <React.Fragment key={obj._id}>
        <Puns set={obj} />
      </React.Fragment>
    );
  });

  const MainType = main.map((obj) => {
    return (
      <React.Fragment key={obj._id}>
        <Puns set={obj} />
      </React.Fragment>
    );
  });

  const Block = (props) => {
    return <div className={styles.block}>{props.children}</div>;
  };

  const Title = () => {
    return <h1 className={styles.title}>Соберите бургер</h1>;
  };

  const Button = () => {
    return (
      <>
        <button className={styles.button}>Булки</button>
        <button className={styles.button}>Соусы</button>
        <button className={styles.button}>Начинки</button>
      </>
    );
  };

  const Ingredients = () => {
    return (
      <div className={styles.section}>
        <h2 className={styles.headline}>Булки</h2>
        <ul className={styles.list}>{BunType}</ul>
        <h2 className={styles.headline}>Соусы</h2>
        <ul className={styles.list}>{SauceType}</ul>
        <h2 className={styles.headline}>Начинки</h2>
        <ul className={styles.list}>{MainType}</ul>
      </div>
    );
  };

  return (
    <>
      <Block>
        <Title />
        <Button />
        <Ingredients />
      </Block>
    </>
  );
}

function Puns(props) {
  return (
    <>
      <li className={styles.position}>
        <img src={props.set.image} className={styles.positionImage} />
        <div className={styles.positionPrice}>
          <p className={styles.positionNumber}>{props.set.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.positionText}>{props.set.name}</p>
      </li>
    </>
  );
}

BurgerIngredients.PropType = {
  components: PropTypes.arrayOf(ingredientPropType).isRequired,
};

Puns.PropType = {
  components: PropTypes.arrayOf(ingredientPropType).isRequired,
};
