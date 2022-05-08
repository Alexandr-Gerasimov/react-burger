import React from 'react';
import styles from './App.module.css';
import { AppHeader } from '../app-header/app-header'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

export class App extends React.Component {
  render() {
    return (
      <>
      <div className={ styles.App }>
        <AppHeader />
        <BurgerIngredients />
      </div>
      </>
    );
  }
}
