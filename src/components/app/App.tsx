import React, { useState } from "react";
import styles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { components } from "../../utils/data";

const App = () => {
  return (
    <>
      <div className={styles.App}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients components={components} />
          <BurgerConstructor components={components} />
        </main>
      </div>
    </>
  );
};

export default App;

