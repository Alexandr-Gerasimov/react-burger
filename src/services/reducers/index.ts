import { combineReducers } from "redux";
import {
  GET_INGREDIENT_LIST_REQUEST,
  GET_INGREDIENT_LIST_SUCCESS,
  GET_INGREDIENT_LIST_FAILED,
  INGREDIENT_DESCRIPTION_OPENED,
  INGREDIENT_DESCRIPTION_CLOSED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  ORDER_DETAILS_OPENED,
  ORDER_DETAILS_CLOSED,
  TAB_SWITCH,
  ADD_ITEM,
  DELETE_ITEM,
  REFRESH_FILLINGS,
  NEW_ORDER,
} from "../actions";
import { profileReducer } from "./profile";
import { wsFeedReducer } from "./wsFeedReducer";
import { wsReducer } from "./wsOrdersReducer";
import { TIngredient } from "../types/data";
import { TIndexActions } from "../actions";
import { TOrderDetails } from "../types/data";

export type TInitialState = {
  ingredients: ReadonlyArray<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;

  ingredientQuantity: boolean | null;
  ingredientCounter: string;

  currentTab: string;

  constructorBuns: TIngredient | null;
  constructorFillings: ReadonlyArray<TIngredient>;
  getAllItems: ReadonlyArray<TIngredient>;

  ingredientsModal: boolean;
  ingredient: TIngredient | {};

  orderDetails: TOrderDetails | {};
  orderDetailsModal: boolean;
  orderDetailsRequest: boolean;
  orderDetailsFailed: boolean;
};

const initialState: TInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  ingredientQuantity: null,
  ingredientCounter: "undefined",

  currentTab: "buns",

  constructorBuns: null,
  constructorFillings: [],
  getAllItems: [],

  ingredientsModal: false,
  ingredient: {},

  orderDetails: {},
  orderDetailsModal: false,
  orderDetailsRequest: false,
  orderDetailsFailed: false,
};

console.log(initialState.orderDetails)

export const ingredientReducer = (state = initialState, action: TIndexActions): TInitialState => {
  switch (action.type) {
    
    case GET_INGREDIENT_LIST_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,  
        ingredientsRequest: false,
        ingredientsFailed: false,
      };
    case GET_INGREDIENT_LIST_FAILED:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    case INGREDIENT_DESCRIPTION_OPENED:
      return {
        ...state,
        ingredientsModal: true,
        ingredient: action.ingredient,
      };
    case INGREDIENT_DESCRIPTION_CLOSED:
      return {
        ...state,
        ingredientsModal: false,
        ingredient: {},
      };
    case GET_ORDER_NUMBER_REQUEST:
      return {
        ...state,
        orderDetailsRequest: true,
      };
    case GET_ORDER_NUMBER_SUCCESS:
      return {
        ...state,
        orderDetails: action.orderDetails,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
      };
    case GET_ORDER_NUMBER_FAILED:
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: true,
      };
    case ORDER_DETAILS_OPENED:
      return {
        ...state,
        orderDetailsModal: action.orderDetailsModal,
      };
    case ORDER_DETAILS_CLOSED:
      return {
        ...state,
        orderDetailsModal: false,
      };
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: state.currentTab === "items" ? "postponed" : "items",
      };
    }
    case ADD_ITEM: {
      if (action.ingredient.type === "bun") {
        return {
          ...state,
          constructorBuns: action.ingredient,
          constructorFillings: [...state.constructorFillings],
          getAllItems: [...state.getAllItems, action.ingredient],
          ingredients: [...state.ingredients].map((item) =>
            item._id === action.ingredient._id ? { ...item, __v: 2 } : { ...item, __v: 0}
          ),
        };
      } else {
        return {
          ...state,
          constructorBuns: state.constructorBuns,
          constructorFillings: [...state.constructorFillings, action.ingredient],
          getAllItems: [...state.getAllItems, action.ingredient],
          ingredients: [...state.ingredients].map((item) =>
            item._id === action.ingredient._id
              ? { ...item, __v: ++item.__v }
              : item
          ),
        };
      }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        constructorFillings: [...state.constructorFillings].filter(
          (item) => item.id !== action.ingredient.id
        ),
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.ingredient._id ? { ...item, __v: --item.__v } : item
        ),
      };
    }
    case REFRESH_FILLINGS: {
      const constructorFillings = [...state.constructorFillings];
      constructorFillings.splice(
        action.to,
        0,
        constructorFillings.splice(action.from, 1)[0]
      );
      return {
        ...state,
        constructorFillings,
      };
    }
    case NEW_ORDER: {
      return {
        ...state,
        constructorBuns: null,
        constructorFillings: [],
        ingredients: [...state.ingredients].map((item) =>
        item.__v !== null ? { ...item, __v: 0 } : item
      ),
      }
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  socket: wsReducer,
  socketFeed: wsFeedReducer,
  fillings: ingredientReducer,
  profile: profileReducer,
  
});
