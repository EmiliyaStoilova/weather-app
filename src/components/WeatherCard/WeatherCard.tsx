import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { ListItem } from "src/pages/Weather/types";

interface WeatherCardProps {
  data: ListItem;
}

export const WeatherCard: FunctionComponent<WeatherCardProps> = ({ data }) => {
  return (
    <div className="shadow-md p-2 rounded-md">
      <div>{format(new Date(data.dt_txt), "dd.MM.yy - HH:mm")}</div>
    </div>
  );
};
