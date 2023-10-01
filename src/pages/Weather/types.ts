export enum Units {
  STANDARD = "standard",
  METRIC = "metric",
  IMPERIAL = "imperial"
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface GetWeatherParams extends Coord {
  units: Units;
}

export interface City {
  id: number;
  country: string;
  coord: Coord;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface ListItemMain {
  temp: number;
  feels_like: number;
  humidity: number;
}

export interface ListItemWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ListItem {
  dt: number;
  dt_txt: string;
  visibility: number;
  main: ListItemMain;
  wind: { speed: number };
  weather: ListItemWeather[];
}

export interface Weather {
  city: City;
  list: ListItem[];
}

export interface WeatherSate {
  weather: Weather | null;
}
