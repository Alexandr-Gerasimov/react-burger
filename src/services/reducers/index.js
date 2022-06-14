import { combineReducers } from "redux";
import React, { useState, useEffect } from "react";
import {
  GET_INGREDIENT_LIST_REQUEST,
  GET_INGREDIENT_LIST_SUCCESS,
  GET_INGREDIENT_LIST_FAILED,
  CONSTRUCTOR_BUNS,
  CONSTRUCTOR_FILLINGS,
  INGREDIENT_DESCRIPTION_OPENED,
  INGREDIENT_DESCRIPTION_CLOSED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  ORDER_DETAILS_OPENED,
  ORDER_DETAILS_CLOSED,
  TAB_SWITCH,
  ADD_ITEM
} from "../actions";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  currentTab: "buns",

  constructorBuns: [],
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
    case CONSTRUCTOR_BUNS:
      return {
        ...state,
        constructorBuns: action.payload,
      };
    case CONSTRUCTOR_FILLINGS:
      return {
        ...state,
        constructorFillings: action.payload,
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
      return {
        ...state,
        ingredients: [...state.ingredients, ...state.postponed.filter(ingredient => ingredient.id === action.id)]
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  fillings: ingredientReducer,
});
