import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DayDetailsPage, WeatherPage } from "./pages/Weather";
import { ROUTE_CONFIG } from "./routes/config";

function App() {
  // console.log(process.env.REACT_APP_APPID)
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<WeatherPage />} path={ROUTE_CONFIG.MAIN} />
          <Route element={<DayDetailsPage />} path={ROUTE_CONFIG.DAY_DETAIL} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
