import { Action, Dispatch } from "../types";
import { Middleware, MiddlewareAPI } from "./types";

export const logger: Middleware =
  (storeAPI: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    console.log("will dispatch", action);
    const result = next(action);
    console.log("next state", storeAPI.getState());
    return result;
  };
