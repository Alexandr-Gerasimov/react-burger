import React, { useEffect } from "react";
import { useSelector, useDispatch } from "../services/store";
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
} from "../services/actions/wsFeedAction";
import { ProfileOrdersPageNext } from "../components/feed-profile/order-next";

export function ProfileOrdersPage() {
  const wsConnected = useSelector((store) => store.socketFeed.wsConnected);

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
    <ProfileOrdersPageNext />
  </>
  )
}
