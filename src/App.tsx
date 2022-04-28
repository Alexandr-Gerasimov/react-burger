import React, { Children } from 'react';
import './App.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { type } from 'os';

export class State extends React.Component {
  state ={
    type: {
      white: 'primary',
      grey: 'secondary',
      red: 'error',
      green: 'success'
    }
  }
}

export class Header extends React.Component {
  render() {
    return (
      <header className='App-header'>
        {this.props.children}
      </header>
    );
  }
}

export class Logotype extends React.Component {
  render() {
    return (
        <Logo />
    );
  }
}

export class Menu extends React.Component {
  render() {
    return (
      <nav className='App-header-nav'>
        {this.props.children}
      </nav>
    );
  }
}

export class MenuItem extends React.Component {
  render() {
    return (
      <button className='App-header-private' type='button'>
        <ProfileIcon type='secondary'/>
        <p className='App-header-text'>Личный кабинет</p>
      </button>
    );
  }
}

export class ButtonConst extends React.Component {
  render() {
    return (
        <button className='App-header-nav-button' type='button'>
          <BurgerIcon type='secondary'/>
          <p className='App-header-text'>Конструктор</p>
        </button>
    );
  }
}

export class ButtonOrder extends React.Component {
  render() {
    return (
        <button className='App-header-nav-button' type='button'>
          <ListIcon type='secondary'/>
          <p className='App-header-text'>Лента заказов</p>
        </button>
    );
  }
}

