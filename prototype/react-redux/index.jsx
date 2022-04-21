import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "./src";

const store = createStore(
  (state, action) => {
    const { type } = action;
    switch (type) {
      case "add":
        return { count: state.count + 1 };
      default:
        return { count: 0 };
    }
  },
  { count: 0 }
);

const Children = () => {
  const state = useSelector((state) => {
    return state.count;
  });

  const dispatch = useDispatch();

  return (
    <div>
      {state}
      <button onClick={() => dispatch({ type: "add", payload: 1 })}>add</button>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      Hello world
      <Children></Children>
    </Provider>
  );
};

ReactDOM.render(<App></App>, document.getElementById("app"));
