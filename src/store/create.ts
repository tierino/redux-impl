import { Action, Reducer, Store, Dispatch, AugmentStore } from "./types";

const INIT = "@@_INIT";

const win: any = window;
let devTools = win.__REDUX_DEVTOOLS_EXTENSION__;
if (devTools) {
  devTools.connect({});
}

export function createStore<S, A extends Action>(
  reducer: Reducer<S, A>,
  init?: S,
  augment?: AugmentStore
): Store<S, A> {
  if (augment) {
    return augment(createStore)(reducer, init);
  }

  let state = init;
  let isDispatching = false;
  const listeners: Array<() => void> = [];

  if (devTools) {
    devTools.send({ type: INIT }, init);
  }

  function getState() {
    if (isDispatching) {
      throw new Error("Cannot call getState() while dispatching.");
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

    for (const listener of listeners) {
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
