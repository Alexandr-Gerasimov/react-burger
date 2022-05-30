import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredietn-details";
import OrderDetails from "../order-details/order-details";
import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";

const App = () => {
  const [ingredients, setIngredients] = useState([])
  const [components, setComponents] = useState([]);
  const [ingredientsDetails, setIngredientsDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState(false);
  const [component, setComponent] = useState({});
  const config = {
    baseUrl: "https://norma.nomoreparties.space/api",
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
    fetch(`${config.baseUrl}/ingredients`, {
      headers: config.headers,
    })
      .then(getResponseData)
      .then((response) => {
        setIngredients(response.data)
        setComponents(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [modalData, setModalData] = useState({
    name: "",
    order: {
      number: ""
    },
    success: true
  });

  const ingredientsId = ingredients.map(ingredient => ingredient._id)

  const postOrderNumber = (ingredientsId) => {
    fetch(`${config.baseUrl}/orders`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        "ingredients": ingredientsId
      })
    })
    .then(getResponseData)
    .then((data) => {
      setModalData(data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const componentClick = (component) => {
    setComponent(component);
    setIngredientsDetails(true);
  };

  const orderButtonClick = (ingredientsId) => {
    postOrderNumber(ingredientsId)
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
          <BurgerIngredientsContext.Provider value={ingredients}>
          <BurgerIngredients onClick={componentClick} />
          <BurgerConstructor ingredientsId={ingredientsId} onClick={orderButtonClick} />
          </BurgerIngredientsContext.Provider>
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
            <OrderDetails orderNumber={modalData}/>
          </Modal>
        )}
      </div>
    </>
  );
};

export default App;
