import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetWeatherParams, Weather } from "./types";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
  endpoints: (builder) => ({
    getWeatherCast: builder.query<Weather, GetWeatherParams>({
      query: ({ lat, lon, units }) => ({
        url: "",
        params: {
          lat,
          lon,
          appid: process.env.REACT_APP_APPID,
          units
        }
      })
    })
  })
});

export const { useGetWeatherCastQuery, useLazyGetWeatherCastQuery } = weatherApi;
export const weatherApiReducer = weatherApi.reducer;
export const weatherApiMiddleware = weatherApi.middleware;
