import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  Link,
} from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredietn-details";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import {
  closeIngredientModals,
  onIngredientClick,
  closeOrderModal,
  postOrderNumber,
} from "../../services/actions";
import { Loader } from "../../ui/loader/loader";
import { useAuth } from "../../services/auth";
import { setCookie } from "../../services/utils";

const App = () => {
  const ingredients = useSelector((store) => store.fillings.ingredients);
  const ingredientsModal = useSelector(
    (state) => state.fillings.ingredientsModal
  );
  const auth = useAuth();

  const ingredient = useSelector((store) => store.fillings.ingredient);
  
  const id = ingredient.id
  const orderDetails = useSelector((store) => store.fillings.orderDetails);
  const orderDetailsModal = useSelector(
    (store) => store.fillings.orderDetailsModal
  );
  const orderDetailsRequest = useSelector(
    (store) => store.fillings.orderDetailsRequest
  );
  const dispatch = useDispatch();

  const ingredientsId = ingredients.map((ingredient) => ingredient._id);
  const [login, setLogin] = useState(false);


  const componentClick = (component) => {
    dispatch(onIngredientClick(component));
    localStorage.setItem("ingredient", JSON.stringify(component))
  };

  const closeIngredientModal = () => {
    dispatch(closeIngredientModals());
  };

  const closeOrderModals = () => {
    dispatch(closeOrderModal());
  };

  const content = useMemo(() => {
    return orderDetailsRequest ? (
      <Loader size="large" />
    ) : (
      <Modal onClick={closeOrderModals}>
        <OrderDetails orderNumber={orderDetails} />
      </Modal>
    );
  }, [orderDetailsRequest, orderDetails]);

  const OrderButtonClick = () => {
    if (auth.user) {
      dispatch(postOrderNumber(ingredientsId));
    } else {
      setLogin(true);
    }
  };

  if (login) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  return (
    <div className={styles.App}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients onClick={componentClick}/>
          <BurgerConstructor onClick={OrderButtonClick} />
        </main>
        {orderDetailsModal && content}
      </DndProvider>
    </div>
  );
};

export default App;
