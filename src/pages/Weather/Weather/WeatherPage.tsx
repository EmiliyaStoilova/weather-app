import React, { useEffect, useMemo, useState } from "react";
import { compareAsc } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useAppSelector } from "app/redux/hooks";

import { useGetWeatherCastQuery, useLazyGetWeatherCastQuery } from "../weatherApi";
import { Button, InputField, Layout, LoadingOverlay, SelectField } from "components";
import { weatherSelector } from "../weatherSlice";
import SearchIcon from "assets/search.svg";
import { Units } from "../types";
import { WeatherCard } from "./components";

const SofiaLat = 42.69751;
const SofiaLon = 23.32415;

export const WeatherPage = () => {
  const savedUnitsValue = localStorage.getItem("units") as Units;
  // Sofia coordinates - default values
  const [lat, setLat] = useState<string | number>(SofiaLat);
  const [lon, setLon] = useState<string | number>(SofiaLon);
  const [units, setUnits] = useState(savedUnitsValue || Units.STANDARD);

  const { isLoading } = useGetWeatherCastQuery(
    { lat: Number(lat), lon: Number(lon), units },
    { refetchOnMountOrArgChange: true }
  );
  const [getData, { isFetching }] = useLazyGetWeatherCastQuery();
  const { weather } = useAppSelector(weatherSelector);

  const unitsOptions = useMemo(() => {
    return [
      {
        value: Units.STANDARD,
        title: "Kelvin"
      },
      {
        value: Units.IMPERIAL,
        title: "Fahrenheit"
      },
      {
        value: Units.METRIC,
        title: "Celsius"
      }
    ];
  }, []);

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
    await getData({ lat: Number(lat), lon: Number(lon), units });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUnits = event.target.value as Units;
    setUnits(selectedUnits);
    localStorage.setItem("units", selectedUnits);
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

  return isLoading ? (
    <LoadingOverlay />
  ) : (
    <Layout>
      <>
        <div className="mb-4 md:flex justify-end md:justify-between items-center">
          <div className="mb-4 md:mb-0 grid grid-rows-3 gap-4 sm:grid-cols-3 sm:grid-rows-1 w-full md:w-[50%]">
            <div className="w-full">
              <InputField handleChange={(e) => setLat(e.target.value)} value={lat} placeholder="Latitude" />
            </div>
            <div className="w-full">
              <InputField handleChange={(e) => setLon(e.target.value)} value={lon} placeholder="Longitude" />
            </div>
            <div className="w-full">
              <Button
                text="Search"
                onClick={() => searchNewCoordinates()}
                icon={SearchIcon}
                disabled={isFetching || isLoading}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <SelectField value={units} onChange={handleSelectChange} options={unitsOptions} />
          </div>
        </div>
        <div className="mb-4">
          <WeatherCard data={today[0]} isTodayCard city={weather?.city} />
        </div>
        <div className="hidden md:grid grid-cols-4 gap-4">
          {restDays.slice(0, 4).map((item) => (
            <WeatherCard key={item.dt} data={item} />
          ))}
        </div>
        <div className="md:hidden">
          <Swiper breakpoints={{ 520: { slidesPerView: 2.3 } }} spaceBetween={8} slidesPerView={1.5}>
            {restDays.slice(0, 4).map((item) => (
              <SwiperSlide key={item.dt}>
                <WeatherCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    </Layout>
  );
};
