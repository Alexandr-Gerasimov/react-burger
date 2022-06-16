import React, { useContext, useMemo, useEffect } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
  DeleteIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { ADD_ITEM, DELETE_ITEM } from "../../services/actions";


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

  const onDelete = (id) => {
    console.log(id)
    dispatch({
      type: DELETE_ITEM,
      id,
    });
  };

  const price = useMemo(() => {
    return (
      (constructorBuns === null ? 0 : constructorBuns.price * 2) +
      constructorFillings.reduce((s, v) => s + v.price, 0)
    );
  }, [constructorBuns, constructorFillings]);

  return (
    <div className={styles.block}>
      <div className={styles.construct} ref={dropTarget}>
        {constructorBuns === null ? <div>Выберите булку</div> : <div className={styles.positionTop} key={constructorBuns._id}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${constructorBuns.name} (верх)`}
            price={constructorBuns.price}
            thumbnail={constructorBuns.image}
          />
        </div>}
        <ul className={styles.list}>
          {constructorFillings === null ? <div>Выберите булку</div> : 
          constructorFillings
            .filter((components) => components.type !== "bun")
            .map((components) => {
              return (
                <React.Fragment key={components._id}>
                  <li className={styles.position}>
                    <DragIcon type="primary" />
                    <div className={styles.ingredient}>
                      <ConstructorElement
                        isLocked={false}
                        text={components.name}
                        price={components.price}
                        thumbnail={components.image}
                        handleClose={() => onDelete(components.id)}
                      />
                    </div>
                  </li>
                </React.Fragment>
              );
            })}
        </ul>
        {constructorBuns === null ? <div>Выберите булку</div> : <div className={styles.positionTop} key={constructorBuns._id}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${constructorBuns.name} (низ)`}
            price={constructorBuns.price}
            thumbnail={constructorBuns.image}
          />
        </div>}
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
