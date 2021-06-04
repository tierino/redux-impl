import { Reducer } from "../types";

type Theme = "dark" | "light";

type Actions = { type: "THEME_CHANGE"; theme: Theme };

export const init: Theme = "light";

export const reducer: Reducer<Theme, Actions> = (
  state: Theme = init,
  action: Actions
) => {
  switch (action.type) {
    case "THEME_CHANGE": {
      const { theme } = action;
      return theme;
    }
    default:
      return state;
  }
};
