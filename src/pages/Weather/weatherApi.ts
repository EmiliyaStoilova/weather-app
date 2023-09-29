import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coord, Weather } from "./types";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
  endpoints: (builder) => ({
    getWeatherCast: builder.query<Weather, Coord>({
      query: ({ lat, lon }) => ({
        url: "",
        params: {
          lat,
          lon,
          appid: process.env.REACT_APP_APPID,
          units: "metric"
        }
      })
    })
  })
});

export const { useGetWeatherCastQuery, useLazyGetWeatherCastQuery } = weatherApi;
export const weatherApiReducer = weatherApi.reducer;
export const weatherApiMiddleware = weatherApi.middleware;
