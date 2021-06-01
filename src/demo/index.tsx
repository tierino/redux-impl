import "./app.scss";
import { store } from "../store";
import { Provider } from "react-redux";
import React, { useState } from "react";

export const App: React.FC = () => {
  const [post, setPost] = useState("");
  const [id, setId] = useState(0);

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    store.dispatch({
      type: "ADD_POST",
      post: { id: id.toString(), content: post },
    });

    setId(id + 1);
    setPost("");
  };

  const onChange = (ev: React.FormEvent<HTMLInputElement>) => {
    setPost(ev.currentTarget.value);
  };

  const removePost = (id: string) => {
    store.dispatch({
      type: "REMOVE_POST",
      id,
    });
  };

  const renderPosts = (): JSX.Element[] => {
    const posts = [];

    for (const post of store.getState().posts) {
      posts.push(
        <li key={post.id} onClick={() => removePost(post.id)}>
          {post.content}
        </li>
      );
    }

    return posts;
  };

  return (
    <Provider store={store as any}>
      <h1>redux-impl</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={post}></input>
        <button>Dispatch</button>
      </form>
      <ul>{renderPosts()}</ul>
    </Provider>
  );
};
