import { createStore } from "./store";
import * as post from "./post";

export const store = createStore(post.reducer, post.init);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
