import { useMemo, useCallback,  } from "react";
import styles from "./burger-constructor.module.css";
import update from "immutability-helper";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ADD_ITEM,
  DELETE_ITEM,
  REFRESH_FILLINGS,
} from "../../services/actions";
import { ConstructorCard } from "./constructor-card.js";

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
      id: nanoid(),
    });
  };

  const onDelete = (components) => {
    dispatch({
      type: DELETE_ITEM,
      payload: components,
    });
  };

  const refreshFillings = (from, to) => {
    dispatch({
      type: REFRESH_FILLINGS,
      to,
      from,
    });
  };

  const price = useMemo(() => {
    return (
      (constructorBuns === null ? 0 : constructorBuns.price * 2) +
      constructorFillings.reduce((s, v) => s + v.price, 0)
    );
  }, [constructorBuns, constructorFillings]);

  const renderCard = useCallback((components, index) => {
    return (
      <div key={components.id}>
        <ConstructorCard
          components={components}
          index={index}
          moveCard={refreshFillings}
          onDelete={onDelete}
        />
      </div>
    );
  }, []);

  return (
    <div className={styles.block}>
      <div className={styles.construct} ref={dropTarget}>
        {constructorBuns === null ? (
          <div className={styles.emptyTop}>Выберите булку</div>
        ) : (
          <div
            className={styles.positionTop}
            key={(constructorBuns.id = nanoid())}
          >
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
          <div
            className={styles.positionTop}
            key={(constructorBuns.id = nanoid())}
          >
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
        {constructorBuns === null ? <div className={styles.unactiveButton}>Оформить заказ</div> : <Button
          type="primary"
          size="large"
          onClick={() => onClick(ingredientsId)}
        >
          Оформить заказ
        </Button>}
        
      </div>
    </div>
  );
}

BurgerConstructor.PropType = {
  components: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClick: PropTypes.func.isRequired,
};
