import React, { useMemo } from "react";
import { useGetWeatherCastQuery } from "../weatherApi";
import { LoadingOverlay, WeatherCard } from "src/components";
import { compareAsc, isSameHour, setHours } from "date-fns";

export const WeatherPage = () => {
  const { data, isLoading } = useGetWeatherCastQuery();

  const today = useMemo(() => {
    return (
      data?.list.filter(
        (item) => !compareAsc(new Date(item.dt_txt).setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0))
      ) ?? []
    );
  }, [data]);

  const restDays = useMemo(() => {
    return (
      data?.list.filter(
        (item) =>
          compareAsc(new Date(item.dt_txt).setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0)) &&
          new Date(item.dt_txt).getHours() === 12
      ) ?? []
    );
  }, [data]);

  return isLoading ? (
    <LoadingOverlay />
  ) : (
    <div className="py-8 mx-auto max-w-4xl">
      <div className="mb-4">
        <WeatherCard data={today[0]} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {restDays.slice(0, 4).map((item) => (
          <WeatherCard key={item.dt} data={item} />
        ))}
      </div>
    </div>
  );
};
