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

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  ingredientQuantity: null,
  ingredientCounter: "undefined",

  currentTab: "buns",

  constructorBuns: null,
  constructorFillings: [],

  ingredientsModal: false,
  ingredient: {},

  orderDetails: {},
  orderDetailsModal: false,
  orderDetailsRequest: false,
  orderDetailsFailed: false,
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_LIST_REQUEST:
      return {
        ...state,
        ingredientsRequest: true,
      };
    case GET_INGREDIENT_LIST_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
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
        ingredient: action.payload,
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
        orderDetails: action.payload,
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
        orderDetailsModal: action.payload,
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
      if (action.payload.type === "bun") {
        return {
          ...state,
          constructorBuns: action.payload,
          constructorFillings: [...state.constructorFillings],
          ingredients: [...state.ingredients].map((item) =>
            item._id === action.payload._id ? { ...item, __v: 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          constructorBuns: state.constructorBuns,
          constructorFillings: [...state.constructorFillings, action.payload],
          ingredients: [...state.ingredients].map((item) =>
            item._id === action.payload._id
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
          (item) => item.id !== action.payload.id
        ),
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.payload._id ? { ...item, __v: --item.__v } : item
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
  fillings: ingredientReducer,
  profile: profileReducer,
});
