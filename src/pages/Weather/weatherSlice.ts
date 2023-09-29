import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/redux/store";
import { weatherApi } from "./weatherApi";
import { WeatherSate } from "./types";

const initialState: WeatherSate = {
  weather: JSON.parse(localStorage.getItem("data") ?? "") || null
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addMatcher(weatherApi.endpoints.getWeatherCast.matchFulfilled, (state, { payload }) => {
      state.weather = payload;
      localStorage.setItem("data", JSON.stringify(payload));
    })
});

export const weatherReducer = weatherSlice.reducer;
export const weatherSelector = (state: RootState) => state.weather;
