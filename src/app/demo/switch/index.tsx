import { connect } from "react-redux";
import { AppState, store } from "../../../store";

type Props = {
  theme: AppState["theme"];
};

const Switch: React.FC<Props> = ({ theme }) => {
  const toggle = () => {
    return theme === "dark" ? "light" : "dark";
  };

  const onClick = () => {
    store.dispatch({
      type: "THEME_CHANGE",
      theme: toggle(),
    });
  };

  return <button onClick={onClick}>{theme}</button>;
};

const mapState = (state: AppState) => ({ theme: state.theme });

export default connect(mapState)(Switch);
