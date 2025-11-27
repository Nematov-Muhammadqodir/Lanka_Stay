import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PartnerProperty } from "@/src/libs/types/partnerInput/partnerProperty";

// Try to read initial state from localStorage
const savedPartnerProperty =
  typeof window !== "undefined"
    ? localStorage.getItem("partnerProperty")
    : null;

interface PartnerPropertyState {
  data: PartnerProperty | null;
}

const initialState: PartnerPropertyState = {
  data: savedPartnerProperty ? JSON.parse(savedPartnerProperty) : null,
};

const partnerPropertySlice = createSlice({
  name: "partnerProperty",
  initialState,
  reducers: {
    setPartnerProperty(state, action: PayloadAction<PartnerProperty>) {
      state.data = action.payload;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("partnerProperty", JSON.stringify(action.payload));
      }
    },
    clearPartnerProperty(state) {
      state.data = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("partnerProperty");
      }
    },
  },
});

export const { setPartnerProperty, clearPartnerProperty } =
  partnerPropertySlice.actions;

export default partnerPropertySlice.reducer;
