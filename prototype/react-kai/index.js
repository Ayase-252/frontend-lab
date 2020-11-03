const { mount, createElement } = require("./lib/element");
const { useState } = require("./lib/hooks");

function App() {
  const [counter, setCounter] = useState(0);
  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleDecrease = () => {
    setCounter(counter - 1);
  };

  return createElement("div", { style: "color: red" }, [
    createElement("span", {}, [`${counter}`]),
    createElement("button", { onclick: handleAdd }, ["add"]),
    createElement("button", { onclick: handleDecrease }, ["substract"]),
  ]);
}

mount(createElement(App, {}, []), document.querySelector("#root"));
