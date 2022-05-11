import React from 'react';
import styles from './burger-ingredients.module.css'
import IngredientType from '../burger-ingredients/ingredient-type';

export class BurgerIngredients extends React.Component {

  render() {

    class Block extends React.Component {
        render() {
          return (
            <div className={ styles.block }>
                {this.props.children}
            </div>
          );
        }
      }

    class Title extends React.Component {
      render() {
        return (
          <h1 className={ styles.title }>
            Соберите бургер
          </h1>
        );
      }
    }
    
    class Button extends React.Component {
        render() {
          return (
            <>
            <button className={ styles.button }>Булки</button>
            <button className={ styles.button }>Соусы</button>
            <button className={ styles.button }>Начинки</button>
            </>
          );
        }
    }

    class Ingredients extends React.Component {
        render() {
          return (
            <div className={ styles.section }>
                <IngredientType/>
            </div>
          );
        }
    }
    
    return (
      <>
        <Block>
            <Title />
            <Button />
            <Ingredients />
        </Block>
      </>
    );
  }
}



