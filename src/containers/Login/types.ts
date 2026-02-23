/**
 * Login container and form types.
 */

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginUIState {
  showPassword: boolean;
  errorMsg: string;
  loading: boolean;
}

export type LoginUIAction =
  | { type: "TOGGLE_SHOW_PASSWORD" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAR_ERROR" };
