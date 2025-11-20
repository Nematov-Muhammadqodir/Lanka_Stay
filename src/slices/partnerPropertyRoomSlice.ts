import { createSlice } from "@reduxjs/toolkit";
import {
  BathroomFacilities,
  RoomFacilities,
  RoomNames,
  RoomTypes,
} from "../libs/enums/propertyRoom.enum";
import { IPartnerPropertyRoom } from "../libs/types/partnerInput/partnerPropertyRoom";
import { RootState } from "@/store";

const storedPartnerPropertyRoomInput =
  typeof window !== "undefined"
    ? localStorage.getItem("partnerPropertyRoomInput")
    : null;

interface PartnerPropertyRoomInputState {
  input: IPartnerPropertyRoom;
}

const defaultInput: IPartnerPropertyRoom = {
  propertyId: "",
  roomType: RoomTypes.SINGLE,
  currentRoomTypeAmount: 0,
  availableBeds: {
    single: 0,
    double: 0,
    king: 0,
    superKing: 0,
  },
  numberOfGuestsCanStay: 0,
  isSmokingAllowed: false,
  isBathroomPrivate: false,
  availableBathroomFacilities: [],
  roomFacilities: [],
  roomName: RoomNames.BUDGET_DOUBLE_ROOM,
  roomPricePerNight: "",
};

const initialState: PartnerPropertyRoomInputState = {
  input: storedPartnerPropertyRoomInput
    ? JSON.parse(storedPartnerPropertyRoomInput)
    : defaultInput,
};

const partnerPropertyRoomSlice = createSlice({
  name: "iPartnerPropertyRoom",
  initialState,
  reducers: {
    // --- simple string fields ---
    setPropertyId: (state, action) => {
      state.input.propertyId = action.payload;
    },

    setRoomPricePerNight: (state, action) => {
      state.input.roomPricePerNight = action.payload;
    },

    // --- enums ---
    setRoomType: (state, action) => {
      state.input.roomType = action.payload as RoomTypes;
    },

    setRoomName: (state, action) => {
      state.input.roomName = action.payload as RoomNames;
    },

    // --- numbers ---
    setCurrentRoomTypeAmount: (state, action) => {
      state.input.currentRoomTypeAmount = action.payload;
    },

    setNumberOfGuestsCanStay: (state, action) => {
      state.input.numberOfGuestsCanStay = action.payload;
    },

    // --- available beds (nested object) ---
    setAvailableBedSingle: (state, action) => {
      state.input.availableBeds.single = action.payload;
    },
    setAvailableBedDouble: (state, action) => {
      state.input.availableBeds.double = action.payload;
    },
    setAvailableBedKing: (state, action) => {
      state.input.availableBeds.king = action.payload;
    },
    setAvailableBedSuperKing: (state, action) => {
      state.input.availableBeds.superKing = action.payload;
    },

    // --- booleans ---
    setIsSmokingAllowed: (state, action) => {
      state.input.isSmokingAllowed = action.payload;
    },

    setIsBathroomPrivate: (state, action) => {
      state.input.isBathroomPrivate = action.payload;
    },

    // --- arrays: bathroom facilities ---
    addBathroomFacility: (state, action) => {
      const value = action.payload as BathroomFacilities;
      if (!state.input.availableBathroomFacilities.includes(value)) {
        state.input.availableBathroomFacilities.push(value);
      }
    },

    removeBathroomFacility: (state, action) => {
      const value = action.payload as BathroomFacilities;
      state.input.availableBathroomFacilities =
        state.input.availableBathroomFacilities.filter(
          (item) => item !== value
        );
    },

    // --- arrays: room facilities ---
    addRoomFacility: (state, action) => {
      const value = action.payload as RoomFacilities;
      if (!state.input.roomFacilities.includes(value)) {
        state.input.roomFacilities.push(value);
      }
    },

    removeRoomFacility: (state, action) => {
      const value = action.payload as RoomFacilities;
      state.input.roomFacilities = state.input.roomFacilities.filter(
        (item) => item !== value
      );
    },

    // --- reset everything ---
    resetRoomInput: (state) => {
      state.input = defaultInput;
    },
  },
});

export const {
  setPropertyId,
  setRoomPricePerNight,
  setRoomType,
  setRoomName,
  setCurrentRoomTypeAmount,
  setNumberOfGuestsCanStay,
  setAvailableBedSingle,
  setAvailableBedDouble,
  setAvailableBedKing,
  setAvailableBedSuperKing,
  setIsSmokingAllowed,
  setIsBathroomPrivate,
  addBathroomFacility,
  removeBathroomFacility,
  addRoomFacility,
  removeRoomFacility,
  resetRoomInput,
} = partnerPropertyRoomSlice.actions;

export const partnerPropertyRoomInputValue = (state: RootState) =>
  state.partnerPropertyRoomInput.input;

export default partnerPropertyRoomSlice.reducer;
