import "./demo.scss";
import { AppState, store } from "../../store";
import { connect } from "react-redux";
import React, { useState } from "react";

const Demo: React.FC = () => {
  const [content, setContent] = useState("");
  const [id, setId] = useState("0");

  const onSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    store.dispatch({
      type: "ADD_POST",
      post: { id: id.toString(), content },
    });

    setId((parseInt(id) + 1).toString());
    setContent("");
  };

  const onChange = (ev: React.FormEvent<HTMLInputElement>) => {
    setContent(ev.currentTarget.value);
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
    <div>
      <h1>redux-impl</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={content} name="content"></input>
        <button>Dispatch</button>
      </form>
      <ul>{renderPosts()}</ul>
    </div>
  );
};

const mapState = (state: AppState) => ({
  posts: state.posts,
});

export default connect(mapState)(Demo);
