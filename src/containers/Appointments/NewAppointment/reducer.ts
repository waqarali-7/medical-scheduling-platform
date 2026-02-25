import { BookingFormData } from "@/types";

export interface AppointmentState {
  formData: BookingFormData;
  step: number;
  isSubmitting: boolean;
  searchSpec: string;
  error: string | null;
}

export const initialFormData: BookingFormData = {
  selectedDoctor: null,
  selectedDate: "",
  selectedSlot: null,
  selectedType: "",
  reason: "",
  notes: "",
};

export const initialState: AppointmentState = {
  formData: initialFormData,
  step: 0,
  isSubmitting: false,
  searchSpec: "",
  error: null,
};

type Action =
  | { type: "SET_FIELD"; field: keyof BookingFormData; value: BookingFormData[keyof BookingFormData] }
  | { type: "SET_STEP"; step: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_SEARCH"; searchSpec: string }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "RESET" };

export function appointmentReducer(state: AppointmentState, action: Action): AppointmentState {
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
        step: Math.min(3, state.step + 1),
      };

    case "PREV_STEP":
      return {
        ...state,
        step: Math.max(0, state.step - 1),
      };

    case "SET_SEARCH":
      return {
        ...state,
        searchSpec: action.searchSpec,
      };

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
