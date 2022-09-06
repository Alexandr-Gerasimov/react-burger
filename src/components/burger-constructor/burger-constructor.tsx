import { useMemo, useCallback, FC } from "react";
import styles from "./burger-constructor.module.css";
import { nanoid } from "nanoid";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import {
  ADD_ITEM,
  DELETE_ITEM,
  REFRESH_FILLINGS,
} from "../../services/actions";
import { ConstructorCard } from "./constructor-card";
import { useSelector, useDispatch } from "../../services/store";
import { TIngredient } from "../../services/types/data";

type TBurgerConstructor = {
  onClick: (ingredientsId: string[]) => void;
}

type TDrop ={
  set: TIngredient
}

export const BurgerConstructor: FC<TBurgerConstructor> = ({ onClick }) => {

  const constructorBuns = useSelector(
    (store) => store.fillings.constructorBuns
  );

  const constructorFillings = useSelector(
    (store) => store.fillings.constructorFillings
  );

  const orgerItems = useSelector((store) => store.fillings.getAllItems);

  const dispatch = useDispatch();
  const ingredientsId = orgerItems.map((ingredient) => ingredient._id);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(set: TDrop) {
      console.log(set);
      moveIngredient(set.set);
    },
  });

  const moveIngredient = (set: TIngredient) => {
    dispatch({
      type: ADD_ITEM,
      ingredient: set,
    });
  };

  const onDelete = (components: TIngredient) => {
    dispatch({
      type: DELETE_ITEM,
      ingredient: components,
    });
  };

  const refreshFillings = (from: number, to: number) => {
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
        {constructorBuns === null ? (
          <div className={styles.unactiveButton}>Оформить заказ</div>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={() => onClick(ingredientsId)}
          >
            Оформить заказ
          </Button>
        )}
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired,
};