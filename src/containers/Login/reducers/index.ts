import type { LoginUIState, LoginUIAction } from "../types";

export const INITIAL_LOGIN_UI_STATE: LoginUIState = {
  showPassword: false,
  errorMsg: "",
  loading: false,
};

export function loginUIReducer(state: LoginUIState, action: LoginUIAction): LoginUIState {
  switch (action.type) {
    case "TOGGLE_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "SET_ERROR":
      return { ...state, errorMsg: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "CLEAR_ERROR":
      return { ...state, errorMsg: "" };
    default:
      return state;
  }
}
