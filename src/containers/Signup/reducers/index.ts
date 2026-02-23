import type {SignupUIState, SignupUIAction} from "../types";

export const INITIAL_SIGNUP_UI_STATE: SignupUIState = {
  showPassword: false,
  showConfirmPassword: false,
  errorMsg: "",
  successMsg: "",
  loading: false,
};

export function signupUIReducer(state: SignupUIState, action: SignupUIAction): SignupUIState {
  switch (action.type) {
    case "TOGGLE_SHOW_PASSWORD":
      return {...state, showPassword: !state.showPassword};
    case "TOGGLE_SHOW_CONFIRM_PASSWORD":
      return {...state, showConfirmPassword: !state.showConfirmPassword};
    case "SET_ERROR":
      return {...state, errorMsg: action.payload};
    case "SET_SUCCESS":
      return {...state, successMsg: action.payload};
    case "SET_LOADING":
      return {...state, loading: action.payload};
    case "CLEAR_MESSAGES":
      return {...state, errorMsg: "", successMsg: ""};
    default:
      return state;
  }
}
