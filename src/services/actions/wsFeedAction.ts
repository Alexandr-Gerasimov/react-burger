import { TWSFeed } from "../types/data";

export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE: 'WS_FEED_GET_MESSAGE' = 'WS_FEED_GET_MESSAGE';
export const WS_FEED_SEND_MESSAGE: 'WS_FEED_SEND_MESSAGE' = 'WS_FEED_SEND_MESSAGE';
export const WS_FEED_USER_NAME_UPDATE: 'WS_FEED_USER_NAME_UPDATE' = 'WS_FEED_USER_NAME_UPDATE';

export interface IWsFeedConnectionStartAction {
    readonly type: typeof WS_FEED_CONNECTION_START;
}

export interface IWsFeedConnectionSuccessAction {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface IWsFeedConnectionErrorAction {
    readonly type: typeof WS_FEED_CONNECTION_ERROR;
}

export interface IWsFeedConnectionClosedAction {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IWsFeedGetMessageAction {
    readonly type: typeof WS_FEED_GET_MESSAGE;
    readonly message: TWSFeed;
}

export interface IWsFeedSendMessageAction {
    readonly type: typeof WS_FEED_SEND_MESSAGE;
}

export interface IWsFeedUserNameUpdateAction {
    readonly type: typeof WS_FEED_USER_NAME_UPDATE;
}

export type TWsFeedActions =
| IWsFeedConnectionStartAction
| IWsFeedConnectionSuccessAction
| IWsFeedConnectionErrorAction
| IWsFeedConnectionClosedAction
| IWsFeedGetMessageAction
| IWsFeedSendMessageAction
| IWsFeedUserNameUpdateAction;