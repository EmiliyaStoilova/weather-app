import Sun from "assets/01d.png";
import Moon from "assets/01n.png";
import DayClouds from "assets/02d.png";
import NightClouds from "assets/02n.png";
import Clouds from "assets/03.png";
import Rain from "assets/09.png";
import LightRainDay from "assets/10d.png";
import LightRainNight from "assets/10n.png";
import ThunderStorm from "assets/11.png";
import Snow from "assets/13.png";
import Mist from "assets/50.png";

export const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case "01d":
      return Sun;
    case "01n":
      return Moon;
    case "02d":
      return DayClouds;
    case "02n":
      return NightClouds;
    case "03d":
      return Clouds;
    case "03n":
      return Clouds;
    case "04d":
      return DayClouds;
    case "04n":
      return NightClouds;
    case "09d":
      return Rain;
    case "09n":
      return Rain;
    case "10d":
      return LightRainDay;
    case "10n":
      return LightRainNight;
    case "11d":
      return ThunderStorm;
    case "11n":
      return ThunderStorm;
    case "13d":
      return Snow;
    case "13n":
      return Snow;
    case "50d":
      return Mist;
    case "50n":
      return Mist;

    default:
      break;
  }
};
