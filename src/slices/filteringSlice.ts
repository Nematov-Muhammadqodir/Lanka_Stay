import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  propertyRegion?: string;
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
      startDate: undefined,
      endDate: undefined,
      adults: 1,
      children: 0,
      page: 1,
      limit: 6,
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
} = filterSlice.actions;

export default filterSlice.reducer;
