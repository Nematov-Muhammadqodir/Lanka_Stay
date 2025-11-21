import { configureStore } from "@reduxjs/toolkit";
import partnerSignupInput from "./src/slices/partnerSlice";
import partnerLoginInput from "./src/slices/partnerLoginSlice";
import partnerPropertyInput from "./src/slices/createPartnerPropertySlice";
import partnerPropertyRoomInput from "./src/slices/partnerPropertyRoomSlice";
import filterReducer from "./src/slices/filteringSlice";

export const store = configureStore({
  reducer: {
    partnerSignupInput: partnerSignupInput,
    partnerLoginInput: partnerLoginInput,
    partnerPropertyInput: partnerPropertyInput,
    partnerPropertyRoomInput: partnerPropertyRoomInput,
    filters: filterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
