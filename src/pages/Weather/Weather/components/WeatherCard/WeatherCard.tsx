import React, { FunctionComponent } from "react";
import { format } from "date-fns";

import { City, ListItem } from "pages/Weather/types";
import { getWeatherIcon } from "app/helpers/getWeatherIcon";
import CalendarIcon from "assets/calendar-icon.svg";
import LocationIcon from "assets/location.svg";
import WindIcon from "assets/wind.png";
import { useNavigate } from "react-router-dom";

interface WeatherCardProps {
  data: ListItem;
  city?: City;
  isTodayCard?: boolean;
}

export const WeatherCard: FunctionComponent<WeatherCardProps> = ({ data, city, isTodayCard }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`shadow-md md:m-0 p-4 rounded-md flex justify-between cursor-pointer ${
        isTodayCard ? "flex-col md:flex-row" : "flex-col m-4"
      }`}
      onClick={() => navigate(`${data.dt}`)}
      data-test="weather-card"
    >
      <div
        className={`mb-4 md:mb-0 flex items-center ${
          isTodayCard ? "md:w-2/3 flex-col sm:flex-row justify-around" : "flex-col m-4 justify-between"
        }`}
      >
        <img
          className={`${isTodayCard ? "m-5 w-40 sm:w-52 h-auto" : "m-auto w-28 h-auto"}`}
          src={getWeatherIcon(data.weather[0].icon)}
        />
        <div className={`${isTodayCard ? "w-1/3" : "w-full my-5"} flex flex-col justify-center items-center`}>
          <span className={`${isTodayCard ? "text-8xl font-bold" : "text-2xl"} mb-2`}>
            {Math.round(data.main.temp)}
            {"\xB0"}
          </span>
          <span className={`${isTodayCard ? "text-2xl" : ""} mb-2`}>
            Feels like: {Math.round(data.main.feels_like)}
            {"\xB0"}
          </span>
          {data.wind.speed >= 50 && (
            <div className="flex items-center">
              <img src={WindIcon} className={`${isTodayCard ? "w-16" : "w-8"}`} />
              {/* <span className={`${isTodayCard ? "text-lg" : ""}`}>
              Wind speed: {Math.round(data.wind.speed)}</span> */}
            </div>
          )}
        </div>
      </div>
      <div className={`flex flex-col justify-between ${isTodayCard && "md:w-1/3"}`}>
        {city && (
          <div className="mb-6 md:mb-0 h-full flex flex-col items-center justify-center">
            <div className="flex items-center">
              <img src={LocationIcon} className="w-9 mr-2" />
              <span className="text-4xl font-medium">{city.name}</span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-end">
          <img src={CalendarIcon} className={`${isTodayCard ? "w-8" : "w-6"}  mr-2`} />
          <span className={`${isTodayCard ? "text-xl font-semibold" : "text-base"}`}>
            {format(new Date(data.dt_txt), "eeee, dd MMM")}
          </span>
        </div>
      </div>
    </div>
  );
};
