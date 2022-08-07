import { config } from "../../services/api";
import { getResponseData } from "../../services/api";
import { WS_CONNECTION_START } from "./wsOrdersAction";
import { WS_FEED_CONNECTION_START } from "./wsFeedAction";
import { getCookie } from "../utils";

export const GET_INGREDIENT_LIST_REQUEST = "GET_INGREDIENT_LIST_REQUEST";
export const GET_INGREDIENT_LIST_SUCCESS = "GET_INGREDIENT_LIST_SUCCESS";
export const GET_INGREDIENT_LIST_FAILED = "GET_INGREDIENT_LIST_FAILED";

export const INGREDIENT_DESCRIPTION_OPENED = "INGREDIENT_DESCRIPTION_OPENED";
export const INGREDIENT_DESCRIPTION_CLOSED = "INGREDIENT_DESCRIPTION_CLOSED";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const ORDER_DETAILS_OPENED = "ORDER_DETAILS_OPENED";
export const ORDER_DETAILS_CLOSED = "ORDER_DETAILS_CLOSED";

export const TAB_SWITCH = "TAB_SWITCH";

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

export const REFRESH_FILLINGS = "REFRESH_FILLINGS";
export const NEW_ORDER = "NEW_ORDER";

export function getAllItems() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENT_LIST_REQUEST,
      payload: true,
    });
    fetch(`${config.baseUrl}/ingredients`, {
      headers: config.headers,
    })
      .then(getResponseData)
      .then((res) => {
        dispatch({
          type: GET_INGREDIENT_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
    dispatch({
      type: GET_INGREDIENT_LIST_FAILED,
      payload: false,
    });
    dispatch({
      type: WS_CONNECTION_START
    });
    dispatch({
      type: WS_FEED_CONNECTION_START
    });
  };
}

export const closeIngredientModals = () => ({
  type: INGREDIENT_DESCRIPTION_CLOSED,
});

export const onIngredientClick = (ingredient) => ({
  type: INGREDIENT_DESCRIPTION_OPENED,
  payload: ingredient,
});

export function postOrderNumber(ingredientsId) {
  console.log(ingredientsId)
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
      payload: true,
    });
    fetch(`${config.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token")
      },
      body: JSON.stringify({
        ingredients: ingredientsId,
      }),
    })
      .then(getResponseData)
      .then((data) => {
        console.log(data)
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          payload: data,
        });
        dispatch({
          type: ORDER_DETAILS_OPENED,
          payload: true,
        });
        dispatch({
          type: NEW_ORDER,
        });
      })
      .catch((err) => console.log(err));
    dispatch({
      type: GET_ORDER_NUMBER_FAILED,
      payload: false,
    });
  };
}

export const closeOrderModal = () => ({
  type: ORDER_DETAILS_CLOSED,
});

export const openOrderModal = () => ({
  type: ORDER_DETAILS_OPENED,
});
