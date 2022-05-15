import React, {useState} from 'react';
import styles from './burger-constructor.module.css'
import { ConstructorElement, Button, DragIcon, DeleteIcon, ArrowDownIcon, BurgerIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropType } from '../../utils/prop-types'
import PropTypes from 'prop-types';

export default function BurgerConstructor({components}) {

  const bun = components.filter((components) => components.type !== "bun")

  const bunType = bun.map((components) => {
      return (
          <React.Fragment key={components._id}>
              <li className={ styles.position }>
                  <DragIcon type="primary" />
                  <div className={ styles.ingredient }>
                    <ConstructorElement
                      key={components._id}
                      isLocked={false}
                      text={components.name}
                      price={components.price}
                      thumbnail={components.image}
                    />
                  </div>
                </li>
              
          </React.Fragment>
      );
  })

    class Block extends React.Component {
        render() {
          return (
            <div className={ styles.block }>
                {this.props.children}
            </div>
          );
        }
    }

    class Info extends React.Component {
      render() {
        return (
          <div className={ styles.info }>
              <div className={ styles.price }>
                <p className={ styles.total}>610</p>
                <CurrencyIcon type="primary" />
              </div>
              <Button type="primary" size="large">
                Оформить заказ
              </Button>
          </div>
        );
    }

  }
    
    return (
      <>
        <Block>
          <div className={ styles.construct }>
              <ul className={ styles.list }>
              <div className={ styles.positionTop }>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text="Краторная булка N-200i (верх)"
                  price={components.price}
                  thumbnail={components.image}
                />
              </div>
              {bunType}
              <div className={ styles.positionTop }>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text="Краторная булка N-200i (низ)"
                  price={components.price}
                  thumbnail={components.image}
                />
              </div>
              </ul>
          </div>
          <Info />
        </Block>
      </>
    );
}

BurgerConstructor.PropType = {
  components: PropTypes.arrayOf(ingredientPropType).isRequired,
};