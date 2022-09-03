import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import styles from "./login.module.css";
import OrderItems from "../components/order-items/order-items";
import { Loader } from "../ui/loader/loader";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/actions/wsOrdersAction";
import { useSelector, useDispatch } from "../services/store";
import { FeedPageNext } from "../components/feed-order/feed-page-next";

export function FeedPage() {
  const wsConnected = useSelector((store) => store.socket.wsConnected);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!wsConnected) {
      dispatch({ type: WS_CONNECTION_START });
    }
  }, [wsConnected]);
  useEffect(() => {
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <>
      <FeedPageNext />
    </>
  );
}
