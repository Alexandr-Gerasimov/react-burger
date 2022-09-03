import { Redirect } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./main.module.css";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useMemo, useState } from "react";
import {
  onIngredientClick,
  closeOrderModal,
  postOrderNumber,
} from "../../services/actions";
import { Loader } from "../../ui/loader/loader";
import { useAuth } from "../../services/auth";
import { getCookie } from "../../services/utils";
import { useSelector, useDispatch } from "../../services/store";
import { TIngredient, TOrderDetails } from "../../services/types/data";

const Main = () => {
  const ingredients = useSelector((store) => store.fillings.ingredients);
  const auth: any = useAuth();
  const orderNumber = useSelector<string>((store) => store.fillings.orderNumber);
  console.log(orderNumber)
  const orderDetailsModal = useSelector(
    (store) => store.fillings.orderDetailsModal
  );
  const orderDetailsRequest = useSelector(
    (store) => store.fillings.orderDetailsRequest
  );
  const dispatch = useDispatch();

  const constructorBuns = useSelector(
    (store) => store.fillings.constructorBuns
  );
  const constructorFillings = useSelector(
    (store) => store.fillings.constructorFillings
  );

  const orderIngredients = [ constructorBuns, ...constructorFillings ]

  
  const [login, setLogin] = useState<boolean>(false);

  const componentClick = (component: string[]) => {
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
        <OrderDetails orderNumber={orderNumber} />
      </Modal>
    );
  }, [orderDetailsRequest, orderNumber]);

  const OrderButtonClick = () => {
    const ingredientsId: any = orderIngredients.map((ingredient) => ingredient!._id);
    console.log(ingredientsId)
    if (auth!.user) {
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
        {orderDetailsModal? content : <Loader  size={24}/>}
      </DndProvider>
    </div>
  );
};

export default Main;
