import styles from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector } from "../../services/store";
import { useParams, useLocation } from "react-router-dom";
import { Loader } from "../../ui/loader/loader";
import { TParams, TLocation, TState, TBackground} from '../../services/types/data'

const IngredientDetails = () => {
  const params = useParams<TParams>();
  const location = useLocation<TLocation>();
  const ingredients = useSelector((store) => store.fillings.ingredients);
  const background = location.state?.background;

  const ingredient = ingredients.find((el) => el._id === params.id);
  if(!ingredient) {
    return <Loader size="large" />
  } else {
    return (
      <>
      {background ? (
        <>
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
    </>
    ) : ( <>
      <div className={styles.ingredientBackDetails}>
      <h1>Детали ингредиента</h1>
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
    </>)

      }
      </>
    )
      
      
  }

  
};

export default IngredientDetails;
