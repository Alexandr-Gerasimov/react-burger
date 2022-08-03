import { Redirect } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import {
  onIngredientClick,
  closeOrderModal,
  postOrderNumber,
} from "../../services/actions";
import { Loader } from "../../ui/loader/loader";
import { useAuth } from "../../services/auth";
import { getCookie } from "../../services/utils";

const Main = () => {
  const ingredients = useSelector((store) => store.fillings.ingredients);
  const auth = useAuth();
  const orderDetails = useSelector((store) => store.fillings.orderDetails);
  const orderDetailsModal = useSelector(
    (store) => store.fillings.orderDetailsModal
  );
  const orderDetailsRequest = useSelector(
    (store) => store.fillings.orderDetailsRequest
  );
  const dispatch = useDispatch();
  const orgerItems = useSelector(
    (store) => store.fillings.getAllItems
  );
  const ingredientsId = orgerItems.map((ingredient) => ingredient._id);
  const [login, setLogin] = useState(false);

  const componentClick = (component) => {
    dispatch(onIngredientClick(component));
    localStorage.setItem("ingredient", JSON.stringify(component));
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
        <main className={styles.main}>
          <BurgerIngredients onClick={componentClick} />
          <BurgerConstructor onClick={OrderButtonClick} />
        </main>
        {orderDetailsModal? content : <Loader />}
      </DndProvider>
    </div>
  );
};

export default Main;
