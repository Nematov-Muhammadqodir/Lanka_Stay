import { createSlice } from "@reduxjs/toolkit";
import {
  HotelStaffLanguages,
  PropertyFacilities,
  PropertyType,
} from "../libs/enums/property.enum";
import { PartnerPropertyInput } from "../libs/types/partnerInput/partnerPropertyInput";
import { RootState } from "@/store";

const storedPartnerPartnerInput =
  typeof window !== "undefined"
    ? localStorage.getItem("partnerPartnerInput")
    : null;

interface PartnerPropertyInputState {
  input: PartnerPropertyInput;
}

const defaultInput: PartnerPropertyInput = {
  partnerId: "",
  propertyType: PropertyType.HOTEL,
  propertyCountry: "",
  propertyRegion: "",
  propertyCity: "",
  propertyPostCode: "",
  propertyName: "",
  propertyStars: 1,
  propertyFacilities: [
    PropertyFacilities.AIR_CONDITIONING,
    PropertyFacilities.AIR_CONDITIONING,
  ],
  breakfastIncluded: false,
  parkingIncluded: false,
  hotelStaffLanguages: [
    HotelStaffLanguages.ENGLISH,
    HotelStaffLanguages.KOREAN,
  ],
  checkInTimeFrom: "",
  checkInTimeUntill: "",
  checkOutTimeFrom: "",
  checkOutTimeUntill: "",
  allowChildren: false,
  allowPets: false,
};

const initialState: PartnerPropertyInputState = {
  input: storedPartnerPartnerInput
    ? JSON.parse(storedPartnerPartnerInput)
    : defaultInput,
};

const partnerPropertySlice = createSlice({
  name: "partnerPropertyInput",
  initialState,
  reducers: {
    setPartnerId: (state, action) => {
      state.input.partnerId = action.payload;
    },
    setPropertyType: (state, action) => {
      state.input.propertyType = action.payload;
    },
    setPropertyCountry: (state, action) => {
      state.input.propertyCountry = action.payload;
    },
    setPropertyRegion: (state, action) => {
      state.input.propertyRegion = action.payload;
    },
    setPropertyCity: (state, action) => {
      state.input.propertyCity = action.payload;
    },
    setPropertyPostCode: (state, action) => {
      state.input.propertyPostCode = action.payload;
    },
    setPropertyName: (state, action) => {
      state.input.propertyName = action.payload;
    },
    setPropertyStars: (state, action) => {
      state.input.propertyStars = action.payload;
    },
    setPropertyFacilities: (state, action) => {
      state.input.propertyFacilities = action.payload;
    },
    setBreakfastIncluded: (state, action) => {
      state.input.breakfastIncluded = action.payload;
    },
    setParkingIncluded: (state, action) => {
      state.input.parkingIncluded = action.payload;
    },
    setHotelStaffLanguages: (state, action) => {
      state.input.hotelStaffLanguages = action.payload;
    },
    setCheckInTimeFrom: (state, action) => {
      state.input.checkInTimeFrom = action.payload;
    },
    setCheckInTimeUntill: (state, action) => {
      state.input.checkInTimeUntill = action.payload;
    },
    setCheckOutTimeFrom: (state, action) => {
      state.input.checkOutTimeFrom = action.payload;
    },
    setCheckOutTimeUntill: (state, action) => {
      state.input.checkOutTimeUntill = action.payload;
    },
    setAllowChildren: (state, action) => {
      state.input.allowChildren = action.payload;
    },
    setAllowPets: (state, action) => {
      state.input.allowPets = action.payload;
    },
  },
});

export const {
  setPartnerId,
  setPropertyType,
  setPropertyCountry,
  setPropertyRegion,
  setPropertyCity,
  setPropertyPostCode,
  setPropertyName,
  setPropertyStars,
  setPropertyFacilities,
  setBreakfastIncluded,
  setParkingIncluded,
  setHotelStaffLanguages,
  setCheckInTimeFrom,
  setCheckInTimeUntill,
  setCheckOutTimeFrom,
  setCheckOutTimeUntill,
  setAllowChildren,
  setAllowPets,
} = partnerPropertySlice.actions;

export const partnerPropertyInputValue = (state: RootState) =>
  state.partnerPropertyInput.input;

export default partnerPropertySlice.reducer;
