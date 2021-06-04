import { createStore } from "./create";
import { applyMiddleware } from "redux";
import { logger } from "./middleware";
import { reducer } from "./reducer";
import { init } from "./init";

export const store = createStore(reducer, init, applyMiddleware(logger));

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
