import { AppState, store } from "../../../store";
import { connect } from "react-redux";

type Props = {
  posts: AppState["posts"];
};

const Posts: React.FC<Props> = ({ posts }) => {
  const remove = (id: string) => {
    store.dispatch({
      type: "POST_REMOVE",
      id,
    });
  };

  const render = (): JSX.Element[] => {
    const postList = [];

    for (const post of posts) {
      postList.push(
        <li key={post.id} onClick={() => remove(post.id)}>
          {post.content}
        </li>
      );
    }

    return postList;
  };

  return <div>{render()}</div>;
};

const mapState = (state: AppState) => ({
  posts: state.posts,
});

export default connect(mapState)(Posts);
