import styles from "./burger-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useLocation, useParams } from "react-router-dom";
import BurgerDetailsOrderNext from './burger-details-order-next'
import { useMemo, useEffect } from "react";
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSED } from "../../services/actions/wsFeedAction";
import { useSelector, useDispatch } from "../../services/store";

function BurgerDetailsOrder() {
  const location = useLocation();

  const wsConnected = useSelector(
    (store) => store.socketFeed.messages
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if(!wsConnected) {
      dispatch({type: WS_FEED_CONNECTION_START})
    }
  },[wsConnected])
  useEffect(() => {
    return() => {
      dispatch({type: WS_FEED_CONNECTION_CLOSED})}
  },[])

  return (
    <>
      {wsConnected && <BurgerDetailsOrderNext />}
    </>
  );
}

BurgerDetailsOrder.PropType = {
  component: ingredientPropType.isRequired,
};

export default BurgerDetailsOrder;
