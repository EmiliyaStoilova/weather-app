import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "src/pages/Weather/weatherApi";
import { weatherReducer, weatherSlice } from "src/pages/Weather/weatherSlice";

export const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherReducer,
    [weatherApi.reducerPath]: weatherApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
