import React from 'react';
import styles from './burger-constructor.module.css'
import IngredientType from '../burger-ingredients/ingredient-type';

export class BurgerConsructor extends React.Component {

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

    class Constructor extends React.Component {
      render() {
        return (
          <div className={ styles.construct }>
              {this.props.children}
          </div>
        );
      }
    }

    class Info extends React.Component {
      render() {
        return (
          <div className={ styles.info }>
              {this.props.children}
          </div>
        );
    }

  }
    
    return (
      <>
        <Block>
          <Constructor />
          <Info />
        </Block>
      </>
    );
  }
}
