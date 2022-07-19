import styles from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientDetails = () => {
  const ing = localStorage.getItem("ingredient")
  const ingredient = JSON.parse(ing)
  return (
    <div className={styles.ingredientDetails}>
      <h1 className={styles.ingredientTitle}>Детали ингредиента</h1>
      <img
        className={styles.ingredientImage}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <p className={styles.ingredientName}>{ingredient.name}</p>
      <ul className={styles.ingredientEnergyValue}>
        <li className={styles.ingredientEnergyValueType}>
          <p className={styles.ingredientEnergyValueTitle}>Калории,ккал</p>
          <span>{ingredient.calories}</span>
        </li>
        <li className={styles.ingredientEnergyValueType}>
          <p className={styles.ingredientEnergyValueTitle}>Белки, г</p>
          <span>{ingredient.proteins}</span>
        </li>
        <li className={styles.ingredientEnergyValueType}>
          <p className={styles.ingredientEnergyValueTitle}>Жиры, г</p>
          <span>{ingredient.fat}</span>
        </li>
        <li className={styles.ingredientEnergyValueType}>
          <p className={styles.ingredientEnergyValueTitle}>Углеводы, г</p>
          <span>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.PropType = {
  component: ingredientPropType.isRequired,
};

export default IngredientDetails;
