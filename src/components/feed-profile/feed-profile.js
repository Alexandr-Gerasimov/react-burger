import { ingredientPropType } from "../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Loader } from "../../ui/loader/loader";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useEffect } from "react";
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSED } from "../../services/actions/wsFeedAction";
import { nanoid } from "nanoid";
import BurgerDetails from "../burger-deteils/burger-details";

const FeedProfile = () => {
  const location = useLocation();
  const params = useParams();
  const background = location.state?.background;
  console.log(params)

  const wsConnected = useSelector(
    (store) => store.socketFeed.messages
  )[0];

  const dispatch = useDispatch();
  useEffect(() => {
    if(!wsConnected) {
      dispatch({type: WS_FEED_CONNECTION_START})
    }
  },[wsConnected])

  if (!wsConnected) {
    return <Loader size="large" />;
  } else {
    return (
      <>
        <BurgerDetails />
      </>
    );
  }
};

FeedProfile.PropType = {
  component: ingredientPropType.isRequired,
};

export default FeedProfile;
