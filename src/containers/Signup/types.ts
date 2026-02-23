/**
 * Signup container and form types.
 */

export type SignupRole = "PATIENT" | "DOCTOR" | "CLINIC_ADMIN";

export interface SignupFormValues {
  role: SignupRole;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/** UI/status state for signup (visibility toggles, messages, loading). */
export interface SignupUIState {
  showPassword: boolean;
  showConfirmPassword: boolean;
  errorMsg: string;
  successMsg: string;
  loading: boolean;
}

export type SignupUIAction =
  | { type: "TOGGLE_SHOW_PASSWORD" }
  | { type: "TOGGLE_SHOW_CONFIRM_PASSWORD" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_SUCCESS"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAR_MESSAGES" };
