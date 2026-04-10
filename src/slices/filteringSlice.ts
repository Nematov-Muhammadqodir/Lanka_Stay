import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  propertyRegion?: string;
  propertyCity?: string;
  propertyType?: string[];
  propertyStars?: number;
  breakfastIncluded?: boolean;
  parkingIncluded?: boolean;
  allowChildren?: boolean;
  allowPets?: boolean;
  priceMin?: number;
  priceMax?: number;
  startDate?: string;
  endDate?: string;
  adults?: number;
  children?: number;
  page: number;
  limit: number;
}

const storedFilters =
  typeof window !== "undefined" ? localStorage.getItem("filters") : null;

const initialState: FilterState = storedFilters
  ? JSON.parse(storedFilters)
  : {
      propertyRegion: "",
      propertyCity: "",
      propertyType: [],
      propertyStars: undefined,
      breakfastIncluded: undefined,
      parkingIncluded: undefined,
      allowChildren: undefined,
      allowPets: undefined,
      startDate: undefined,
      endDate: undefined,
      adults: 1,
      children: 0,
      page: 1,
      limit: 12,
    };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDates(
      state,
      action: PayloadAction<{ startDate?: string; endDate?: string }>
    ) {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setAdults(state, action: PayloadAction<number>) {
      state.adults = action.payload;
    },
    setChildren(state, action: PayloadAction<number>) {
      state.children = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.propertyRegion = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setPropertyCity(state, action: PayloadAction<string>) {
      state.propertyCity = action.payload;
    },
    setPropertyType(state, action: PayloadAction<string>) {
      if (!state.propertyType) state.propertyType = [];
      const type = action.payload;
      if (state.propertyType.includes(type)) {
        state.propertyType = state.propertyType.filter((t) => t !== type);
      } else {
        state.propertyType.push(type);
      }
    },
    setPropertyStars(state, action: PayloadAction<number>) {
      state.propertyStars = action.payload;
    },
    setBreakfastIncluded(state, action: PayloadAction<boolean>) {
      state.breakfastIncluded = action.payload;
    },
    setParkingIncluded(state, action: PayloadAction<boolean>) {
      state.parkingIncluded = action.payload;
    },
    setAllowChildren(state, action: PayloadAction<boolean>) {
      state.allowChildren = action.payload;
    },
    setAllowPets(state, action: PayloadAction<boolean>) {
      state.allowPets = action.payload;
    },
    setPriceMin(state, action: PayloadAction<number | undefined>) {
      state.priceMin = action.payload;
    },
    setPriceMax(state, action: PayloadAction<number | undefined>) {
      state.priceMax = action.payload;
    },
  },
});

export const saveFiltersToLocalStorage = (state: FilterState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("filters", JSON.stringify(state));
  }
};

export const {
  setDates,
  setAdults,
  setChildren,
  setLocation,
  setPage,
  setLimit,
  setPropertyCity,
  setPropertyType,
  setPropertyStars,
  setBreakfastIncluded,
  setParkingIncluded,
  setAllowChildren,
  setAllowPets,
  setPriceMin,
  setPriceMax,
} = filterSlice.actions;

export const filterSliceValue = (state: RootState) => state.filters;

export default filterSlice.reducer;
