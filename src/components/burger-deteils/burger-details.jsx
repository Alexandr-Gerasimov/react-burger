import styles from "./burger-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import BurgerDetailsOrderNext from './burger-details-order-next'
import { useMemo, useEffect } from "react";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/actions/wsOrdersAction";
import BurgerDetailsNext from "./burger-details-next";

function BurgerDetails() {
  const location = useLocation();
  const params = useParams();
  const background = location.state?.background;

  const wsConnected = useSelector(
    (store) => store.socket.messages
  )[0];

  const dispatch = useDispatch();
  useEffect(() => {
    if(!wsConnected) {
      dispatch({type: WS_CONNECTION_START})
    }
  },[wsConnected])
  useEffect(() => {
    return() => {
      dispatch({type: WS_CONNECTION_CLOSED})}
  },[])

  return (
    <>
      {wsConnected && <BurgerDetailsNext />}
    </>
  );
}

BurgerDetails.PropType = {
  component: ingredientPropType.isRequired,
};

export default BurgerDetails;
