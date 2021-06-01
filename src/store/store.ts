import { Action, Reducer, Store, Dispatch } from "./types";

const INIT = "@@_INIT";

const win: any = window;
let devTools = win.__REDUX_DEVTOOLS_EXTENSION__;
if (devTools) {
  devTools.connect({});
}

export function createStore<S, A extends Action>(
  reducer: Reducer<S, A>,
  preloadedState?: S
): Store<S, A> {
  let state = preloadedState;
  const listeners: Array<() => void> = [];

  let isDispatching = false;

  if (devTools) {
    devTools.send({ type: INIT }, preloadedState);
  }

  function getState() {
    if (isDispatching) {
      throw new Error("Cannot call getState() while dispatching");
    }
    return state;
  }

  function subscribe(listener: () => void): () => void {
    listeners.push(listener);

    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function dispatch(action: A) {
    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }

    try {
      isDispatching = true;
      const nextState = reducer(state, action);

      if (devTools) {
        devTools.send(action, nextState);
      }

      state = nextState;
    } finally {
      isDispatching = false;
    }

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }

    return action;
  }

  dispatch({ type: INIT } as A);

  return {
    dispatch: dispatch as Dispatch<A>,
    subscribe,
    getState,
  } as Store<S, A>;
}
