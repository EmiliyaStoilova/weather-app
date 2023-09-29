import React, { FunctionComponent } from "react";
import { format } from "date-fns";

import { City, ListItem } from "pages/Weather/types";
import { getWeatherIcon } from "app/helpers/getWeatherIcon";
import CalendarIcon from "assets/calendar-icon.svg";
import LocationIcon from "assets/location.svg";
import WindIcon from "assets/wind.png";

interface WeatherCardProps {
  data: ListItem;
  city?: City;
  isTodayCard?: boolean;
}

export const WeatherCard: FunctionComponent<WeatherCardProps> = ({ data, city, isTodayCard }) => {
  return (
    <div className={`shadow-md p-4 rounded-md flex justify-between ${!isTodayCard && "flex-col"}`}>
      <img
        className={`${isTodayCard ? "m-5 w-52 h-auto" : "m-auto w-28 h-auto"}`}
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
            {/* <span className={`${isTodayCard ? "text-lg" : ""}`}>Wind speed: {Math.round(data.wind.speed)}</span> */}
          </div>
        )}
      </div>
      <div className={`flex flex-col justify-between ${isTodayCard && "w-1/3"}`}>
        {city && (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="flex items-baseline">
              <img src={LocationIcon} className="w-9 mr-2" />
              <span className="text-5xl font-medium">{city.name}</span>
            </div>
            {/* <div>
              <span className="text-xl">{format(new Date(city.sunrise).getTime() * city.timezone, "HH:mm")}</span>
            </div>
            <div>
              <span className="text-xl">{format(new Date(city.sunset).getTime() * city.timezone, "HH:mm")}</span>
            </div> */}
          </div>
        )}
        <div className="flex items-center justify-end">
          <img src={CalendarIcon} className={`${isTodayCard ? "w-9" : "w-6"}  mr-2`} />
          <span className={`${isTodayCard ? "text-lg font-semibold" : "text-base"}`}>
            {format(new Date(data.dt_txt), "dd.MM.yy")}
          </span>
        </div>
      </div>
    </div>
  );
};
