import { ingredientPropType } from "../../utils/prop-types";
import { useParams, useLocation } from "react-router-dom";
import { Loader } from "../../ui/loader/loader";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useEffect } from "react";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/actions/wsOrdersAction";
import { nanoid } from "nanoid";
import BurgerDetails from "../burger-deteils/burger-details";
import { useSelector, useDispatch } from "../../services/store";

const FeedOrder = () => {
  const location = useLocation();
  const params = useParams();
  const background = location.state?.background;

  const wsConnected = useSelector(
    (store) => store.socket.messages
  );

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
      {wsConnected && <BurgerDetails />}
    </>
  );
}

FeedOrder.PropType = {
  component: ingredientPropType.isRequired,
};

export default FeedOrder;
