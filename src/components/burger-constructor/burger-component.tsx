import React, { useState} from 'react';
import { ArrowDownIcon, BurgerIcon, CurrencyIcon, LockIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import { components } from '../../utils/data'
import { arrayTypeAnnotation } from '@babel/types';

/*
export default function IngredientType() {
    const [arr, setArr] = useState(components)

    const bun = arr.filter((obj) => obj.type === "bun")
    const sauce = arr.filter((obj) => obj.type === "sauce")
    const main = arr.filter((obj) => obj.type === "main")

    const bunType = bun.map((obj) => {
        return (
            <React.Fragment key={obj._id}>
                <Puns set={obj} /> 
            </React.Fragment>
        );
    })

    const sauceType = sauce.map((obj) => {
        return (
            <React.Fragment key={obj._id}>
                <Puns set={obj} /> 
            </React.Fragment>
        );
    })

    const mainType = main.map((obj) => {
        return (
            <React.Fragment key={obj._id}>
                <Puns set={obj} /> 
            </React.Fragment>
        );
    })


    return (
        <>
            <h2 className={ styles.headline }>Булки</h2>
            <ul className={ styles.list }>
                {bunType}
            </ul>
            <h2 className={ styles.headline }>Соусы</h2>
            <ul className={ styles.list }>
                {sauceType}
            </ul> 
            <h2 className={ styles.headline }>Начинки</h2>
            <ul className={ styles.list }>
                {mainType}
            </ul> 
        </>
    )
}

function Puns (props) {
    console.log(props)
    return (
        <>
        <li className={ styles.position }>
            <img src={props.set.image} className={ styles.positionImage } />
            <div className={ styles.positionPrice } >
                <p className={ styles.positionNumber } >{props.set.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={ styles.positionText }>{props.set.name}</p>
        </li>
        </>
    )
}
*/

export function ChoseBun (props) {
    console.log(props)
    if (props.type === 'bun') {
        class BunTop extends React.Component {
            render() {
              return (
                <div className={ styles.positionTop }>
                  <div className={ styles.ingredientTop }>
                    <img src={props.image} className={ styles.positionImage } />
                    <p className={ styles.positionText } >{props.name}</p>
                    <div  className={ styles.positionPrice }>
                      <p className={ styles.positionNumber } >{props.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <LockIcon type="secondary" />
                  </div>
                </div>
            )}
        }        
        
        class BunBottom extends  React.Component {
            render() {
              return (
                <div className={ styles.positionTop }>
                  <div className={ styles.ingredientBottom }>
                    <img src={props.image} className={ styles.positionImage } />
                    <p className={ styles.positionText } >{props.name}</p>
                    <div  className={ styles.positionPrice }>
                      <p className={ styles.positionNumber } >{props.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <LockIcon type="secondary" />
                  </div>
                </div>
              )
            }        
        }

    } else {
        class InsideIngredient extends  React.Component {
            render() {
            return (
                <li className={ styles.position }>
                  <DragIcon type="primary" />
                  <div className={ styles.ingredient }>
                    <img src={props.image} className={ styles.positionImage } />
                    <p className={ styles.positionText } >{props.name}</p>
                    <div  className={ styles.positionPrice }>
                      <p className={ styles.positionNumber } >{props.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <LockIcon type="secondary" />
                  </div>
                </li>
            )}
        }
    }
    
    
}

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