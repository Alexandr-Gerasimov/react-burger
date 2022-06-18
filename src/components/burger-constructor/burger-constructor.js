import React, { useContext, useMemo, useState, useCallback } from "react";
import styles from "./burger-constructor.module.css";
import update from "immutability-helper";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
  DeleteIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { ADD_ITEM, DELETE_ITEM, REFRESH_FILLINGS } from "../../services/actions";
import { ConstructorCard} from "./constructor-card.js"
import { components } from "../../utils/data";

export default function BurgerConstructor({ onClick }) {
  const ingredients = useSelector((store) => store.fillings.ingredients);

  const constructorBuns = useSelector(
    (store) => store.fillings.constructorBuns
  );

  const constructorFillings = useSelector(
    (store) => store.fillings.constructorFillings
  );

  const dispatch = useDispatch();
  const ingredientsId = ingredients.map((ingredient) => ingredient._id);
  console.log(constructorFillings);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(set) {
      moveIngredient(set.set);
    },
  });

  const moveIngredient = (set) => {
    dispatch({
      type: ADD_ITEM,
      payload: set,
    });
  };

  const onDelete = (components) => {
    dispatch({
      type: DELETE_ITEM,
      payload: components,
    });
  };

  const refreshFillings = (from, to) => {
    console.log(to)
    console.log(from)
    dispatch({
      type: REFRESH_FILLINGS,
      to,
      from,
    });
  }

  const price = useMemo(() => {
    return (
      (constructorBuns === null ? 0 : constructorBuns.price * 2) +
      constructorFillings.reduce((s, v) => s + v.price, 0)
    );
  }, [constructorBuns, constructorFillings]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    refreshFillings((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards.dragIndex],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((components, index) => {
    return (
      <ConstructorCard
      components={components}
      index={index}
      moveCard={refreshFillings}
      onDelete={onDelete}
      />
    );
  }, []);


  return (
    <div className={styles.block}>
      <div className={styles.construct} ref={dropTarget}>
        {constructorBuns === null ? (
          <div className={styles.emptyTop}>Выберите булку</div>
        ) : (
          <div className={styles.positionTop} key={constructorBuns._id}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${constructorBuns.name} (верх)`}
              price={constructorBuns.price}
              thumbnail={constructorBuns.image}
            />
          </div>
        )}
        {constructorFillings.length ? (
          <ul className={styles.list}>
            {constructorFillings
              .filter((components) => components.type !== "bun")
              .map((components, i) => renderCard(components, i))}
          </ul>
        ) : (
          <div className={styles.filling}>Выберите начинку</div>
        )}
        {constructorBuns === null ? (
          <div className={styles.emptyBottom}>Выберите булку</div>
        ) : (
          <div className={styles.positionTop} key={constructorBuns._id}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${constructorBuns.name} (низ)`}
              price={constructorBuns.price}
              thumbnail={constructorBuns.image}
            />
          </div>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.price}>
          <p className={styles.total}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => onClick(ingredientsId)}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.PropType = {
  components: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClick: PropTypes.func.isRequired,
};
