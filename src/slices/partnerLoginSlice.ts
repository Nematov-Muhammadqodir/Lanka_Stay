import { createSlice } from "@reduxjs/toolkit";
import { PartnerLoginInput } from "../libs/types/partnerInput/partnerInput";
import { RootState } from "@/store";

const storedPartnerSignupInput =
  typeof window !== "undefined"
    ? localStorage.getItem("partnerLoginInput")
    : null;

interface CartSliceState {
  input: PartnerLoginInput;
}

const defaultInput: PartnerLoginInput = {
  partnerEmail: "",
  partnerPassword: "",
};

const initialState: CartSliceState = {
  input: storedPartnerSignupInput
    ? JSON.parse(storedPartnerSignupInput)
    : defaultInput,
};

const partnerSlice = createSlice({
  name: "partnerLoginInput",
  initialState,
  reducers: {
    setLoginPartnerEmail: (state, action) => {
      state.input.partnerEmail = action.payload;
    },
    setLoginPartnerPassword: (state, action) => {
      state.input.partnerPassword = action.payload;
    },
  },
});

export const { setLoginPartnerEmail, setLoginPartnerPassword } =
  partnerSlice.actions;

export const partnerLoginInputValue = (state: RootState) =>
  state.partnerLoginInput.input;

export default partnerSlice.reducer;
