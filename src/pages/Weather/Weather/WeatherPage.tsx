import React, { useEffect, useMemo, useState } from "react";
import { compareAsc } from "date-fns";

import { useAppSelector } from "app/redux/hooks";

import { useLazyGetWeatherCastQuery } from "../weatherApi";
import { Button, InputField, LoadingOverlay, WeatherCard } from "components";
import { weatherSelector } from "../weatherSlice";
import SearchIcon from "assets/search.svg";

const SofiaLat = 42.69751;
const SofiaLon = 23.32415;

export const WeatherPage = () => {
  // Sofia coordinates - default values
  const [lat, setLat] = useState<string | number>(SofiaLat);
  const [lon, setLon] = useState<string | number>(SofiaLon);

  const [getData, { isFetching }] = useLazyGetWeatherCastQuery();
  const { weather } = useAppSelector(weatherSelector);

  // Get the data for the current day
  const today = useMemo(() => {
    return (
      weather?.list.filter(
        (item) => !compareAsc(new Date(item.dt_txt).setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0))
      ) ?? []
    );
  }, [weather]);

  // Get only the values at 12PM to be shown for all days without the first
  const restDays = useMemo(() => {
    return (
      weather?.list.filter(
        (item) =>
          compareAsc(new Date(item.dt_txt).setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0)) &&
          new Date(item.dt_txt).getHours() === 12
      ) ?? []
    );
  }, [weather]);

  const searchNewCoordinates = async () => {
    await getData({ lat: Number(lat), lon: Number(lon) });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success option
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        // Fail option
        () => console.error("Error")
      );
    }
  }, []);

  useEffect(() => {
    searchNewCoordinates();
  }, []);

  return !weather ? (
    <LoadingOverlay />
  ) : (
    <div className="py-8 mx-auto max-w-4xl">
      <div className="mb-4 flex items-center w-[50%]">
        <div className="flex-grow mr-4">
          <InputField
            handleChange={(e) => setLat(e.target.value)}
            value={lat}
            testId="lat-input"
            placeholder="Latitude"
          />
        </div>
        <div className="flex-grow mr-4">
          <InputField
            handleChange={(e) => setLon(e.target.value)}
            value={lon}
            testId="lon-input"
            placeholder="Longitude"
          />
        </div>
        <div className="w-1/4">
          <Button
            text="Search"
            onClick={() => searchNewCoordinates()}
            testId="search-button"
            icon={SearchIcon}
            disabled={isFetching}
          />
        </div>
      </div>
      <div className="mb-4">
        <WeatherCard data={today[0]} isTodayCard city={weather?.city} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {restDays.slice(0, 4).map((item) => (
          <WeatherCard key={item.dt} data={item} />
        ))}
      </div>
    </div>
  );
};
