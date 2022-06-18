import React, { useContext, useMemo, useRef, useCallback } from "react";
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
import { ADD_ITEM, DELETE_ITEM } from "../../services/actions";

export const ConstructorCard = ({ components, index, moveCard, onDelete }) => {
const id = components.id
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "fillings",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log(dragIndex)
      console.log(hoverIndex)
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "fillings",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <React.Fragment key={(components._id)}>
      <li ref={ref} className={styles.position} data-handler-id={handlerId}>
        <DragIcon type="primary" />
        <div className={styles.ingredient}>
          <ConstructorElement
            isLocked={false}
            index={index}
            text={components.name}
            price={components.price}
            thumbnail={components.image}
            handleClose={() => onDelete(components)}
          />
        </div>
      </li>
    </React.Fragment>
  );
};
