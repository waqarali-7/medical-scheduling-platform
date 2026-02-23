import type { NewClinicFormData } from "./types";
import { DEFAULT_OPENING_HOURS } from "./constants";

export interface ClinicState {
  formData: NewClinicFormData;
  step: number;
  isSubmitting: boolean;
}

export const initialState: ClinicState = {
  formData: {
    name: "",
    phone: "",
    email: "",
    website: "",
    street: "",
    postalCode: "",
    city: "",
    state: "",
    openingHours: DEFAULT_OPENING_HOURS,
    specializations: [],
  },
  step: 0,
  isSubmitting: false,
};

type Action =
  | { type: "SET_FIELD"; field: keyof NewClinicFormData; value: NewClinicFormData[keyof NewClinicFormData] }
  | { type: "SET_STEP"; step: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "RESET" };

export function clinicReducer(state: ClinicState, action: Action): ClinicState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };

    case "SET_STEP":
      return {
        ...state,
        step: action.step,
      };

    case "NEXT_STEP":
      return {
        ...state,
        step: Math.min(4, state.step + 1),
      };

    case "PREV_STEP":
      return {
        ...state,
        step: Math.max(0, state.step - 1),
      };

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
