import { Reducer } from "../types";
import { Post } from "../../app/demo/posts/types";

type Posts = Post[];

type Actions =
  | { type: "POST_ADD"; post: Post }
  | { type: "POST_REMOVE"; id: string };

export const init: Posts = [];

export const reducer: Reducer<Posts, Actions> = (
  state: Posts = init,
  action: Actions
) => {
  switch (action.type) {
    case "POST_ADD": {
      const { id, content } = action.post;
      return [...state, { id, content }];
    }
    case "POST_REMOVE": {
      const nextPosts = state.filter((post) => post.id !== action.id);
      return nextPosts;
    }
    default:
      return state;
  }
};
