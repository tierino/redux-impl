import "./demo.scss";
import { connect } from "react-redux";
import Posts from "./posts";
import Dispatcher from "./dispatcher";
import Switch from "./switch";
import { AppState } from "../../store";

type Props = {
  theme: AppState["theme"];
};

const Demo: React.FC<Props> = ({ theme }) => {
  return (
    <div className={theme === "light" ? "" : "dark"}>
      <h1>redux-impl</h1>
      <Switch />
      <Dispatcher />
      <Posts />
    </div>
  );
};

const mapState = (state: AppState) => ({ theme: state.theme });

export default connect(mapState)(Demo);
