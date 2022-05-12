import React from 'react';
import styles from './burger-constructor.module.css'
import IngredientType from '../burger-ingredients/ingredient-type';
import { LockIcon, DragIcon, ArrowDownIcon, BurgerIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

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

    class BunTop extends  React.Component {
      render() {
        return (
          <div className={ styles.positionTop }>
            <div className={ styles.ingredientTop }>
              <img className={ styles.positionImage } />
              <p className={ styles.positionText } >какой-то ингредиент какой-то ингредиент</p>
              <div  className={ styles.positionPrice }>
                <p className={ styles.positionNumber } >20</p>
                <CurrencyIcon type="primary" />
              </div>
              <LockIcon type="secondary" />
            </div>
          </div>
        )
      }        
    }

    class BunBottom extends  React.Component {
      render() {
        return (
          <div className={ styles.positionTop }>
            <div className={ styles.ingredientBottom }>
              <img className={ styles.positionImage } />
              <p className={ styles.positionText } >какой-то ингредиент какой-то ингредиент</p>
              <div  className={ styles.positionPrice }>
                <p className={ styles.positionNumber } >20</p>
                <CurrencyIcon type="primary" />
              </div>
              <LockIcon type="secondary" />
            </div>
          </div>
        )
      }        
    }

    class Constructor extends React.Component {
      render() {
        return (
          <div className={ styles.construct }>
              <ul className={ styles.list }>
                <BunTop />
                <li className={ styles.position }>
                  <DragIcon type="primary" />
                  <div className={ styles.ingredient }>
                    <img className={ styles.positionImage } />
                    <p className={ styles.positionText } >какой-то ингредиент какой-то ингредиент</p>
                    <div  className={ styles.positionPrice }>
                      <p className={ styles.positionNumber } >20</p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <LockIcon type="secondary" />
                  </div>
                </li>
                <BunBottom />
              </ul>
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
