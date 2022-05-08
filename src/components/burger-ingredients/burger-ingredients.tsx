import React, { useState} from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import { Components } from '../../utils/data'

function BurgerComponents() {
    const [arr, setArr] = React.useState(Components)

    return (
        <div className="App">
        </div>
    );
}


export class BurgerIngredients extends React.Component {
  render() {
    class State extends React.Component {
      state ={
        type: {
          white: 'primary',
          grey: 'secondary',
          red: 'error',
          green: 'success'
        }
      }
    }
    
    console.log(Components)

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
                {this.props.children}
            </div>
          );
        }
    }

    class Puns extends React.Component {
        render() {
          return (
            <>
                <h2 className={ styles.headline }>Булки</h2>
                <ul className={ styles.list }>
                    <li className={ styles.position }>
                        <img className={ styles.positionImage } />
                        <div className={ styles.positionPrice } >
                            <p className={ styles.positionNumber } >20</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className={ styles.positionText }>Какая-нибудь булка</p>
                    </li>
                    <li className={ styles.position }>
                        <img className={ styles.positionImage } />
                        <div className={ styles.positionPrice } >
                            <p className={ styles.positionNumber } >20</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className={ styles.positionText }>Какая-нибудь булка</p>
                    </li>
                </ul>
            </>
          );
        }
    }

    class Sauses extends React.Component {
        render() {
          return (
            <>
                <h2 className={ styles.headline }>Булки</h2>
                <ul className={ styles.list }>
                    <li className={ styles.position }>
                        <img className={ styles.positionImage } />
                        <div className={ styles.positionPrice } >
                            <p className={ styles.positionNumber } >20</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className={ styles.positionText }>Какая-нибудь булка</p>
                    </li>
                    <li className={ styles.position }>
                        <img className={ styles.positionImage } />
                        <div className={ styles.positionPrice } >
                            <p className={ styles.positionNumber } >20</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className={ styles.positionText }>Какая-нибудь булка</p>
                    </li>
                    <li className={ styles.position }>
                        <img className={ styles.positionImage } />
                        <div className={ styles.positionPrice } >
                            <p className={ styles.positionNumber } >20</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className={ styles.positionText }>Какая-нибудь булка</p>
                    </li>
                    <li className={ styles.position }>
                        <img className={ styles.positionImage } />
                        <div className={ styles.positionPrice } >
                            <p className={ styles.positionNumber } >20</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className={ styles.positionText }>Какая-нибудь булка</p>
                    </li>
                </ul>
            </>
          );
        }
    }
    
    return (
      <>
        <Block>
            <Title />
            <Button />
            <Ingredients>
                <Puns />
                <Sauses />
            </Ingredients>
        </Block>
      </>
    );
  }
}
