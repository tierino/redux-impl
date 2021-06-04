import * as post from "./post";
import * as theme from "./theme";
import { combineReducers } from "redux";

const reducers = {
  posts: post.reducer,
  theme: theme.reducer,
};

export const reducer = combineReducers(reducers);
