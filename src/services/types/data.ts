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
  success: boolean
};

export type TProfile = {
  email: string;
  name: string;
};

export type TReg = {
  email: string;
  name: string;
  password: string;
};

export type TLog = {
  email: string;
  password: string;
};

export type TLocationState = {
  from?: string;
  background?: TLoc;
};

type TLoc = {
  hash: string;
  key?: string;
  pathname: string;
  search: string;
  state: TLocationState;
};

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner: string[];
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
  id: string;
};

export type TOrderDetails = {
  name: string;
  order: TOrder;
  success: boolean,
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
  onClick: (component: string[]) => void;
}

export type TParams = {
  id: string;
}

export type TLocation = {
  hash: string,
key: string,
pathname: string,
search: string,
state: TState
background: TBackground
}

export type TState ={
  background: TBackground
}

export type TBackground = {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: null
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
