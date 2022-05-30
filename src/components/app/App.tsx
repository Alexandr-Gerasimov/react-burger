import { useState, useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredietn-details";
import OrderDetails from "../order-details/order-details";

const App = () => {
  const [components, setComponents] = useState([]);
  const [ingredientsDetails, setIngredientsDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState(false);
  const [component, setComponent] = useState({});

  const config = {
    baseUrl: "https://norma.nomoreparties.space/api/ingredients",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  const getIngredients = () => {
    fetch(`${config.baseUrl}`, {
      headers: config.headers,
    })
      .then(getResponseData)
      .then((response) => setComponents(response.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const componentClick = (component) => {
    setComponent(component);
    setIngredientsDetails(true);
  };

  const orderButtonClick = () => {
    setOrderDetails(true);
  };

  const closeIngredientModal = () => {
    setIngredientsDetails(false);
  };

  const closeOrderModal = () => {
    setOrderDetails(false);
  };

  const escCloseIngredientModal = (event) => {
    event.key === "Escape" && closeIngredientModal();
  };

  const escCloseOrderModal = (event) => {
    event.key === "Escape" && closeOrderModal();
  };

  return (
    <>
      <div className={styles.App}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients components={components} onClick={componentClick} />
          <BurgerConstructor
            components={components}
            onClick={orderButtonClick}
          />
        </main>
        {ingredientsDetails && (
          <Modal
            onClick={closeIngredientModal}
            onKeyDown={escCloseIngredientModal}
          >
            <IngredientDetails component={component} />
          </Modal>
        )}
        {orderDetails && (
          <Modal onClick={closeOrderModal} onKeyDown={escCloseOrderModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </>
  );
};

export default App;
