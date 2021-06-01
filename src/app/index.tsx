import { Provider } from "react-redux";
import { store } from "../store";
import Demo from "./demo";

export const App = () => (
  <Provider store={store as any}>
    <Demo />
  </Provider>
);
