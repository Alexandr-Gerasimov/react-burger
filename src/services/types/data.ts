import { rootReducer } from "../reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { TWsFeedActions } from "../actions/wsFeedAction";
import { TWsOrdersActions } from "../actions/wsOrdersAction";
import { TIndexActions } from "../actions";
import { TProfileActions } from "../actions/profile";

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  fat: number;
  id: string;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  readonly _id: string;
};

export type TProfile = {
  email: string;
  name: string;
};

export type TOrder = {
  readonly createdAt: string;
  readonly ingredients: string[];
  readonly name: string;
  readonly number: number;
  readonly owner: string[];
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
  id: string;
};

export type TOrderDetails = {
  readonly name: string;
  readonly order: TOrder;
  readonly success: boolean;
};

export type TGetProfile = {
  user: TProfile;
  accessToken: string;
  refreshToken: string;
  success: boolean;
};

export type TWSFeed = {
  total: number;
  totalToday: number;
  orders: Array<TOrder>;
};

export type TWSFeedOrder = {
  data: TWSFeed;
  timestamp: number;
}

export type TIngredientsCategory = {
  title: string;
  id: string;
  ingredientType: string;
  ref: (node?: Element | null | undefined) => void;
  onClick: () => void;
}

type TApplicationActions = TWsFeedActions | TWsOrdersActions | TIndexActions | TProfileActions

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
