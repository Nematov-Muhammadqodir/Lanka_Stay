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
  propertyType: PropertyType.HOTEL,
  propertyCountry: "",
  propertyRegion: "",
  propertyCity: "",
  propertyPostCode: "",
  propertyName: "",
  propertyStars: 0,
  propertyFacilities: [],
  breakfastIncluded: false,
  parkingIncluded: false,
  hotelStaffLanguages: [HotelStaffLanguages.ENGLISH],
  checkInTimeFrom: "00:00",
  checkInTimeUntill: "00:00",
  checkOutTimeFrom: "00:00",
  checkOutTimeUntill: "00:00",
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
      const facility = action.payload;

      const exists = state.input.propertyFacilities.includes(facility);

      if (exists) {
        // remove
        state.input.propertyFacilities = state.input.propertyFacilities.filter(
          (item) => item !== facility
        );
      } else {
        // add
        state.input.propertyFacilities.push(facility);
      }
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
