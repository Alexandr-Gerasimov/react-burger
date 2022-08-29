import { config } from "../api";
import { getResponseData } from "../api";
import { WS_CONNECTION_START } from "./wsOrdersAction";
import { WS_FEED_CONNECTION_START } from "./wsFeedAction";
import { getCookie } from "../utils";
import { AppDispatch, AppThunk, TIngredient } from "../types/data";

export const GET_INGREDIENT_LIST_REQUEST: "GET_INGREDIENT_LIST_REQUEST" = "GET_INGREDIENT_LIST_REQUEST";
export const GET_INGREDIENT_LIST_SUCCESS: "GET_INGREDIENT_LIST_SUCCESS" = "GET_INGREDIENT_LIST_SUCCESS";
export const GET_INGREDIENT_LIST_FAILED: "GET_INGREDIENT_LIST_FAILED" = "GET_INGREDIENT_LIST_FAILED";

export const INGREDIENT_DESCRIPTION_OPENED: "INGREDIENT_DESCRIPTION_OPENED" = "INGREDIENT_DESCRIPTION_OPENED";
export const INGREDIENT_DESCRIPTION_CLOSED: "INGREDIENT_DESCRIPTION_CLOSED" = "INGREDIENT_DESCRIPTION_CLOSED";

export const GET_ORDER_NUMBER_REQUEST: "GET_ORDER_NUMBER_REQUEST" = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS: "GET_ORDER_NUMBER_SUCCESS" = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED: "GET_ORDER_NUMBER_FAILED" = "GET_ORDER_NUMBER_FAILED";
export const ORDER_DETAILS_OPENED: "ORDER_DETAILS_OPENED" = "ORDER_DETAILS_OPENED";
export const ORDER_DETAILS_CLOSED: "ORDER_DETAILS_CLOSED" = "ORDER_DETAILS_CLOSED";

export const TAB_SWITCH: "TAB_SWITCH" = "TAB_SWITCH";

export const ADD_ITEM: "ADD_ITEM" = "ADD_ITEM";
export const DELETE_ITEM: "DELETE_ITEM" = "DELETE_ITEM";

export const REFRESH_FILLINGS: "REFRESH_FILLINGS" = "REFRESH_FILLINGS";
export const NEW_ORDER: "NEW_ORDER" = "NEW_ORDER";

export interface IGetIngredientListRequestAction {
  readonly type: typeof GET_INGREDIENT_LIST_REQUEST;
}

export interface IGetIngredientListSuccessAction {
  readonly type: typeof GET_INGREDIENT_LIST_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientListFailedAction {
  readonly type: typeof GET_INGREDIENT_LIST_FAILED;
}

export interface IIngredientDescriptionOpenedAction {
  readonly type: typeof INGREDIENT_DESCRIPTION_OPENED;
  readonly ingredient: string[]
}

export interface IIngredientDescriptionClosedAction {
  readonly type: typeof INGREDIENT_DESCRIPTION_CLOSED;
}

export interface IGetOrderNumberRequestAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly orderDetails: TIngredient;
}

export interface IGetOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IOrderDetailsOpenedAction {
  readonly type: typeof ORDER_DETAILS_OPENED;
  readonly orderDetailsModal: boolean;
}

export interface IOrderDetailsClosedAction {
  readonly type: typeof ORDER_DETAILS_CLOSED;
}

export interface ITabSwitchAction {
  readonly type: typeof TAB_SWITCH;
}

export interface IAddItemAction {
  readonly type: typeof ADD_ITEM;
  readonly ingredient: TIngredient;
}

export interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM;
  readonly ingredient: TIngredient;
}

export interface IRefreshFillingsAction {
  readonly type: typeof REFRESH_FILLINGS;
  readonly to: number;
  readonly from: number
}

export interface INewOrderAction {
  readonly type: typeof NEW_ORDER;
}

export type TIndexActions =
| IGetIngredientListRequestAction
| IGetIngredientListSuccessAction
| IGetIngredientListFailedAction
| IIngredientDescriptionOpenedAction
| IIngredientDescriptionClosedAction
| IGetOrderNumberRequestAction
| IGetOrderNumberSuccessAction
| IGetOrderNumberFailedAction
| IOrderDetailsOpenedAction
| IOrderDetailsClosedAction
| ITabSwitchAction
| IAddItemAction
| IDeleteItemAction
| IRefreshFillingsAction
| INewOrderAction

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
      .then((res: any) => {
        dispatch({
          type: GET_INGREDIENT_LIST_SUCCESS,
          ingredients: res.data,
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

export const closeIngredientModals = (): IIngredientDescriptionClosedAction => ({
  type: INGREDIENT_DESCRIPTION_CLOSED,
});

export const onIngredientClick = (ingredient: string[]): IIngredientDescriptionOpenedAction => ({
  type: INGREDIENT_DESCRIPTION_OPENED,
  ingredient
});

export function postOrderNumber(ingredientsId: string) {
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
          orderDetails: data,
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

export const closeOrderModal = (): IOrderDetailsClosedAction => ({
  type: ORDER_DETAILS_CLOSED,
});

export const openOrderModal = (orderDetailsModal: boolean): IOrderDetailsOpenedAction => ({
  type: ORDER_DETAILS_OPENED,
  orderDetailsModal
});
