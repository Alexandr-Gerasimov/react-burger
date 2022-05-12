import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import burgerLogo from '../../images/logo.svg'

export class AppHeader extends React.Component {
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
    
    class Logotype extends React.Component {
      render() {
        return (
            <img src={burgerLogo} className={ styles.logo } />
        );
      }
    }
    
    class Menu extends React.Component {
      render() {
        return (
          <nav className={ styles.nav }>
            {this.props.children}
          </nav>
        );
      }
    }
    
    class MenuItem extends React.Component {
      render() {
        return (
          <button className={ styles.private } type='button'>
            <ProfileIcon type='secondary'/> 
            <p className={ styles.text }>Личный кабинет</p>
          </button>
        );
      }
    }
    
    class ButtonConst extends React.Component {
      render() {
        return (
            <button className={ styles.button } type='button'>
              <BurgerIcon type='secondary' />
              <p className={ styles.text }>Конструктор</p>
            </button>
        );
      }
    }
    
    class ButtonOrder extends React.Component {
      render() {
        return (
            <button className={ styles.button } type='button'>
              <ListIcon type='secondary'/>
              <p className={ styles.text }>Лента заказов</p>
            </button>
        );
      }
    }
    
    return (
      <>
      <Header>
        <Menu>
          <ButtonConst />
          <ButtonOrder />
        </Menu>
        <Logotype />
        <MenuItem />
      </Header>
      </>
    );
  }
}
