import { useState } from "react";
import { connect } from "react-redux";
import { store } from "../../../store";

const Dispatcher: React.FC = () => {
  const [content, setContent] = useState("");
  const [id, setId] = useState("0");

  const onSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    store.dispatch({
      type: "POST_ADD",
      post: { id: id.toString(), content },
    });

    setId((parseInt(id) + 1).toString());
    setContent("");
  };

  const onChange = (ev: React.FormEvent<HTMLInputElement>) => {
    setContent(ev.currentTarget.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={content}
        name="content"
        autoComplete={"off"}
      ></input>
      <button>Dispatch</button>
    </form>
  );
};

export default connect()(Dispatcher);
