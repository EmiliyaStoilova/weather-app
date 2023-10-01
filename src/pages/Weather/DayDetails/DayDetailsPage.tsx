import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { compareAsc, format } from "date-fns";

import { useAppSelector } from "app/redux/hooks";
import { weatherSelector } from "../weatherSlice";
import { getWeatherIcon } from "app/helpers/getWeatherIcon";
import ArrowBack from "assets/arrowBack.svg";

export const DayDetailsPage = () => {
  const navigate = useNavigate();
  const { date } = useParams();
  const { weather } = useAppSelector(weatherSelector);

  const getDataForTheDay = useMemo(() => {
    const selectedDate = weather?.list.find((item) => item.dt === Number(date))?.dt_txt || "";

    return (
      weather?.list.filter(
        (item) => !compareAsc(new Date(item.dt_txt).setHours(0, 0, 0, 0), new Date(selectedDate).setHours(0, 0, 0, 0))
      ) ?? []
    );
  }, [date]);

  return (
    <div className="py-8 px-4 lg:px-0 mx-auto max-w-4xl">
      <div className="shadow-md rounded-md p-4">
        <div className="flex justify-between items-center mb-14">
          <img src={ArrowBack} className="cursor-pointer w-6" onClick={() => navigate(-1)} />
          <span className="text-xl font-semibold ">{format(new Date(getDataForTheDay[0].dt_txt), "eeee, dd MMM")}</span>
        </div>
        <div>
          {getDataForTheDay.map((hour) => (
            <div key={hour.dt} className="mb-6 last:mb-0 grid grid-cols-3 md:grid-cols-5">
              <span className="text-lg">{format(new Date(hour.dt_txt), "HH:mm")}</span>
              <span className="text-xl font-semibold text-center">
                {Math.round(hour.main.temp)}
                {"\xB0"}
              </span>
              <img className="w-8 h-auto ml-auto md:mx-auto" src={getWeatherIcon(hour.weather[0].icon)} />
              <span className="hidden md:block text-center">{hour.weather[0].description}</span>
              <span className="hidden md:block text-center">Wind speed: {hour.wind.speed}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
