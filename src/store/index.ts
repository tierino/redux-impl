import { createStore } from "./store";
import * as post from "./post";
import { applyMiddleware } from "redux";
import { logger } from "./middleware";

export const store = createStore(
  post.reducer,
  post.init,
  applyMiddleware(logger)
);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
