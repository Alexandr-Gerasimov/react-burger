import { ingredientPropType } from "../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Loader } from "../../ui/loader/loader";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useEffect } from "react";
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSED } from "../../services/actions/wsFeedAction";
import { nanoid } from "nanoid";
import BurgerDetailsOrder from "../burger-deteils/burger-details-order";

const FeedProfile = () => {
  const location = useLocation();
  const params = useParams();
  const background = location.state?.background;

  const wsConnected = useSelector(
    (store) => store.socketFeed.messages
  )[0];

  const dispatch = useDispatch();
  useEffect(() => {
    if (!wsConnected) {
      dispatch({ type: WS_FEED_CONNECTION_START });
    }
  }, [wsConnected]);
  useEffect(() => {
    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
    };
  }, []);

    return (
      <>
        {wsConnected && <BurgerDetailsOrder/>}
      </>
    );
  }

FeedProfile.PropType = {
  component: ingredientPropType.isRequired,
};

export default FeedProfile;
