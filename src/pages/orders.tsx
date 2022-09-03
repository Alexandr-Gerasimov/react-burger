import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { nanoid } from "nanoid";
import styles from "./login.module.css";
import OrderItems from "../components/order-items/order-items";
import { useSelector, useDispatch } from "../services/store";
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
} from "../services/actions/wsFeedAction";
import { Loader } from "../ui/loader/loader";
import { ProfileOrdersPageNext } from "../components/feed-profile/order-next";
import { getCookie } from "../services/utils";
import { useAuth } from "../services/auth";

export function ProfileOrdersPage() {
  const auth = useAuth()
  const token = getCookie('token')
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
