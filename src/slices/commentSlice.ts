import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comments } from "../libs/types/comment/comment";

interface CommentState {
  data: Comments | null;
}

const initialState: CommentState = {
  data: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comments>) {
      state.data = action.payload;
    },
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
