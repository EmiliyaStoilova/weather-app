import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";

function App() {
  // console.log(process.env.REACT_APP_APPID)
  return (
    <Provider store={store}>
      <BrowserRouter></BrowserRouter>
    </Provider>
  );
}

export default App;
