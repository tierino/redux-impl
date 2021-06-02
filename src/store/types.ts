export interface Action<T = any> {
  type: T;
}

export interface AnyAction extends Action {
  [props: string]: any;
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;
export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T;
}

export interface Store<S = any, A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
  getState(): S;
  subscribe(listener: () => void): () => void;
  replaceReducer(nextReducer: Reducer<S, A>): void;
}

export type AugmentStore = (next: any) => any;
