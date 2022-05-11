import React from 'react';
import styles from './App.module.css';
import { AppHeader } from '../app-header/app-header'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConsructor } from '../burger-constructor/burger-constructor';

export class App extends React.Component {
  render() {
    return (
      <>
      <div className={ styles.App }>
        <AppHeader />
          <main className={ styles.main }>
            <BurgerIngredients />
            <BurgerConsructor />
          </main>
      </div>
      </>
    );
  }
}
