import { createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../types";

const initialState = {
  data: [],
  status: "loading" as StateStatus,
  error: null,
};
export const hackathonSlice = createSlice({
  name: "hackathon",
  initialState,
  reducers: {
    fetc() {},
  },
});

export const { fetc } = hackathonSlice.actions;
export default hackathonSlice.reducer;
