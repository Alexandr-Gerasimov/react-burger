import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'

export class BurgerConstructor extends React.Component {
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
    
    class Header extends React.Component {
      render() {
        return (
          <header className={ styles.header }>
            {this.props.children}
          </header>
        );
      }
    }
    
    
    
    return (
      <>
      <Header>
      </Header>
      </>
    );
  }
}
