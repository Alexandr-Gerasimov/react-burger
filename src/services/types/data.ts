export type TIngredient = {
    readonly calories: number;
    readonly carbohydrates: number;
    readonly fat: number;
    readonly id: string;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number;
    readonly proteins: number;
    readonly type: string;
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
    readonly price: number;
    readonly status: string;
    readonly updatedAt: string;
    readonly _id: string;
  };

  export type TOrderDetails = {
    readonly name: string;
    readonly order: TOrder;
    readonly success: boolean
  };

  export type TGetProfile = {
    user: TProfile;
    accessToken: string;
    refreshToken: string;
    success: boolean;
  };

  export type TWSFeed = {
    timestamp: number;
    total: number;
    totalToday: number;
    orders: Array<TOrder>;
  }