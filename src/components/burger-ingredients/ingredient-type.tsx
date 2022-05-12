import React, { useState} from 'react';
import { ArrowDownIcon, BurgerIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import { components } from '../../utils/data'
import { arrayTypeAnnotation } from '@babel/types';
import { ChoseBun } from '../burger-constructor/burger-component'

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

function Puns(props) {
    const handleClick = () => {
        ChoseBun(props)
    }
    return (
        <>
        <li className={ styles.position } onClick ={ handleClick }>
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