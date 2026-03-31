import { createSlice } from "@reduxjs/toolkit";
import { PartnerSignupInput } from "../libs/types/partnerInput/partnerInput";
import { set } from "date-fns";
import { RootState } from "@/store";
import { UserRole } from "../libs/enums/user.enum";

const storedPartnerSignupInput =
  typeof window !== "undefined"
    ? localStorage.getItem("partnerSignupInput")
    : null;

interface CartSliceState {
  input: PartnerSignupInput;
}

const defaultInput: PartnerSignupInput = {
  partnerEmail: "",
  partnerFirstName: "",
  partnerLastName: "",
  partnerPhoneNumber: "",
  partnerPassword: "",
  userRole: UserRole.HOTEL_OWNER,
  partnerType: "HOTEL_OWNER",
};

const initialState: CartSliceState = {
  input: storedPartnerSignupInput
    ? JSON.parse(storedPartnerSignupInput)
    : defaultInput,
};
const partnerSlice = createSlice({
  name: "partnerSignupInput",
  initialState,
  reducers: {
    setPartnerEmail: (state, action) => {
      state.input.partnerEmail = action.payload;
    },
    setPartnerFirstName: (state, action) => {
      state.input.partnerFirstName = action.payload;
    },
    setPartnerLastName: (state, action) => {
      state.input.partnerLastName = action.payload;
    },
    setPartnerPhoneNumber: (state, action) => {
      state.input.partnerPhoneNumber = action.payload;
    },
    setPartnerPassword: (state, action) => {
      state.input.partnerPassword = action.payload;
    },
    setUserRole: (state, action) => {
      state.input.userRole = action.payload;
    },
    setPartnerType: (state, action) => {
      state.input.partnerType = action.payload;
    },
  },
});

export const {
  setPartnerEmail,
  setPartnerFirstName,
  setPartnerLastName,
  setPartnerPhoneNumber,
  setPartnerPassword,
  setUserRole,
  setPartnerType,
} = partnerSlice.actions;

export const partnerSignupInputValue = (state: RootState) =>
  state.partnerSignupInput.input;

export default partnerSlice.reducer;
