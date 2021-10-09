import "reflect-metadata";
import { ReactElement } from "react";

import store from "./quiz/store";
import { Provider } from "react-redux";

import Quiz from "./quiz";

function App(): ReactElement {
  return <Quiz></Quiz>;
}

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
