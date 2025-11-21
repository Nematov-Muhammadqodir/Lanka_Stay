import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  startDate: string | null; // store as string NOT Date
  endDate: string | null;
  adults: number;
  children: number;
  rooms: number;
  location: string;
}

const storedFilters =
  typeof window !== "undefined" ? localStorage.getItem("filters") : null;

const initialState: FilterState = storedFilters
  ? JSON.parse(storedFilters)
  : {
      startDate: null,
      endDate: null,
      adults: 1,
      children: 0,
      rooms: 1,
      location: "",
    };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDates(
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
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
    setRooms(state, action: PayloadAction<number>) {
      state.rooms = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
  },
});

// SAVE to localStorage whenever state changes
export const saveFiltersToLocalStorage = (state: FilterState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("filters", JSON.stringify(state));
  }
};

export const { setDates, setAdults, setChildren, setRooms, setLocation } =
  filterSlice.actions;

export default filterSlice.reducer;
