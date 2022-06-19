import styles from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientDetails = ({ component }) => {
  return (
    <div className={styles.ingredientDetails}>
      <h1 className={styles.ingredientTitle}>Детали ингредиента</h1>
      <img
        className={styles.ingredientImage}
        src={component.image}
        alt={component.name}
      />
      <p className={styles.ingredientName}>{component.name}</p>
      <ul className={styles.ingredientEnergyValue}>
        <li className={styles.ingredientEnergyValueType}>
          <p className={styles.ingredientEnergyValueTitle}>Калории,ккал</p>
          <span>{component.calories}</span>
        </li>
        <li className={styles.ingredientEnergyValueType}>
          <p className={styles.ingredientEnergyValueTitle}>Белки, г</p>
          <span>{component.proteins}</span>
        </li>
        <li className={styles.ingredientEnergyValueType}>
          <p className={styles.ingredientEnergyValueTitle}>Жиры, г</p>
          <span>{component.fat}</span>
        </li>
        <li className={styles.ingredientEnergyValueType}>
          <p className={styles.ingredientEnergyValueTitle}>Углеводы, г</p>
          <span>{component.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.PropType = {
  component: ingredientPropType.isRequired,
};

export default IngredientDetails;
