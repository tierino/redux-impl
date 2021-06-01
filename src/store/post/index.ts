import { Reducer } from "../types";
import { Post } from "../../demo/types";

type State = {
  posts: Post[];
};

type Actions =
  | { type: "ADD_POST"; post: Post }
  | { type: "REMOVE_POST"; id: string };

export const init: State = {
  posts: [],
};

export const reducer: Reducer<State, Actions> = (
  state: State,
  action: Actions
) => {
  switch (action.type) {
    case "ADD_POST": {
      const { id, content } = action.post;
      return { ...state, posts: [...state.posts, { id, content }] };
    }
    case "REMOVE_POST": {
      console.log(action.id);
      const newPosts = state.posts.filter((post) => post.id !== action.id);
      return {
        ...state,
        posts: newPosts,
      };
    }
  }
  return state;
};
