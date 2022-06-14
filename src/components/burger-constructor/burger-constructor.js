import React, { useContext, useMemo, useEffect } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";
import { useDispatch, useSelector } from 'react-redux';
import { getConstructorItems } from "../../services/actions"
import { useDrop } from "react-dnd";
import { ADD_ITEM } from "../../services/actions";

export default function BurgerConstructor({ onClick }) {
  const ingredients = useSelector(store => store.fillings.constructorBuns);
  const constructorFillings = useSelector(store => store.fillings.constructorFillings);
  const currentTab = useSelector(store => store.fillings.currentTab);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConstructorItems())
  }, [])

  const ingredientsId = ingredients.map((ingredient) => ingredient._id);

  const Block = (props) => {
    return <div className={styles.block}>{props.children}</div>;
  };

  const price = useMemo(() => {
    return (
      (ingredients.bun ? ingredients.bun.price * 2 : 0) +
      ingredients.reduce((s, v) => s + v.price, 0)
    );
  }, [ingredients]);

  const Info = () => {
    return (
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
    );
  };

  const EmptyTopBun = (ingredients) => {
    if(ingredients === []) {
      return (
        <>
          <p className={styles.topBun}>Выберите булку</p>
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  const EmptyBottomBun = (ingredients) => {
    if(ingredients === []) {
      return (
        <>
          <p className={styles.bottomBun}></p>
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  const EmptyFillings = (constructorFillings) => {
    if(constructorFillings === []) {
      return (
        <>
          <p className={styles.filling}>Выберите ингредиент</p>
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  const TopBun = ({ingredientType}) => {
    const [{ isHover }, dropTarget] = useDrop({
      accept: ingredientType === 'bun' ? 'postponed' : 'items',
      collect: monitor => ({
        isHover: monitor.isOver()
      }),
      drop(ingredientId) {
        if(currentTab === 'bun') {
          moveIngredient(ingredientId)
        }
      }
    });
    const moveIngredient = (ingredients) => {
      dispatch({
        type: ADD_ITEM,
        ...ingredients
      });
    }
    return (
      <>
      <EmptyTopBun />
      <div ref={dropTarget}></div>
        {ingredients
          .filter((components) => components.name === "Краторная булка N-200i")
          .map((components) => {
            return (
              <div className={styles.positionTop} key={components._id}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text="Краторная булка N-200i (верх)"
                  price={components.price}
                  thumbnail={components.image}
                />
              </div>
            );
          })}
      </>
    );
  };

  const Filling = () => {
    return (
      <>
      <EmptyFillings />
      <ul className={styles.list}>
        {constructorFillings
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
                    />
                  </div>
                </li>
              </React.Fragment>
            );
          })}
      </ul>
      </>
    );
  };

  const BottomBun = () => {
    return (
      <>
        <EmptyBottomBun />
        {ingredients
          .filter((components) => components.name === "Краторная булка N-200i")
          .map((components) => {
            return (
              <div className={styles.positionTop} key={components._id}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text="Краторная булка N-200i (низ)"
                  price={components.price}
                  thumbnail={components.image}
                />
              </div>
            );
          })}
      </>
    );
  };

  return (
    <Block>
      <div className={styles.construct}>
        <TopBun ingredientType='bun'/>
        <Filling />
        <BottomBun />
      </div>
      <Info />
    </Block>
  );
}

BurgerConstructor.PropType = {
  components: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClick: PropTypes.func.isRequired,
}
