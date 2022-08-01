import { ingredientPropType } from "../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Loader } from "../../ui/loader/loader";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useEffect } from "react";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/actions/wsOrdersAction";
import { nanoid } from "nanoid";
import BurgerDetails from "../burger-deteils/burger-details";

const FeedOrder = () => {
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

  

  const allOrders = useSelector((store) => { return (wsConnected ? (store.socket.messages) : (<Loader size="large" />))})[0];

  const orders = allOrders.data.orders;
  console.log(orders)

  if (!wsConnected) {
    return <Loader size="large" />;
  } else {
    return (
      <>
        <BurgerDetails props={orders}/>
      </>
    );
  }
};

FeedOrder.PropType = {
  component: ingredientPropType.isRequired,
};

export default FeedOrder;
