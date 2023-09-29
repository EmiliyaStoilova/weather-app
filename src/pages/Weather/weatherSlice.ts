import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/redux/store";

const initialState = {};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {}
});

export const weatherReducer = weatherSlice.reducer;
export const weatherSelector = (state: RootState) => state.weather;
