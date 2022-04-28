import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Button,Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { Header, Logotype, Menu, MenuItem, ButtonConst, ButtonOrder } from './App';

ReactDOM.render(
  <React.StrictMode>
    <Header>
      <Menu>
        <ButtonConst />
        <ButtonOrder />
      </Menu>
      <Logotype />
      <MenuItem />
    </Header>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
