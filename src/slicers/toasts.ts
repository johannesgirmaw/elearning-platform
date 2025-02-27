import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastItem } from "../types/ToastItem";

const initialState: ToastItem[] = [];

let previousId = 0;

const toastSlicer = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastItem>, id = ++previousId) => {
      state.push({
        msg: action.payload.msg,
        duration: action.payload.duration,
        id,
        type: action.payload.type,
      });
      previousId = id;
    },
    removeToast: (state, action: PayloadAction<number>) => {
      return state.filter(value => value.id !==action.payload);
    },
  },
});

export default toastSlicer.reducer;
export const { addToast, removeToast } = toastSlicer.actions;
