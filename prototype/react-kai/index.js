const { mount, createElement } = require("./lib/element");
const { useState } = require("./lib/hooks");

function App() {
  const [counter, setCounter] = useState(0);
  const handleClick = () => {
    setCounter(counter + 1);
  };

  console.log(counter);
  return createElement("div", { style: "color: red" }, [
    createElement("span", {}, [`${counter}`]),
    createElement("button", { onclick: handleClick }, "add"),
  ]);
}

mount(createElement(App, {}, []), document.querySelector("#root"));
