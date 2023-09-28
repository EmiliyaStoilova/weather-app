import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Weather } from "./types";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
  endpoints: (builder) => ({
    getWeatherCast: builder.query<Weather, void>({
      query: () => ({
        url: "",
        params: {
          lat: 42.69751,
          lon: 23.32415,
          appid: process.env.REACT_APP_APPID,
          units: "metric"
        }
      })
    })
  })
});

export const { useGetWeatherCastQuery } = weatherApi;
export const weatherApiReducer = weatherApi.reducer;
export const weatherApiMiddleware = weatherApi.middleware;
