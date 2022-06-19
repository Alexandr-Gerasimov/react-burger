import React, { useRef } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";

export const ConstructorCard = ({ components, index, moveCard, onDelete }) => {
  const id = components.id;
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
    <React.Fragment>
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
