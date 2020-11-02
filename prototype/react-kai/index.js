const { mount, createElement } = require("./lib/element");

function App() {
  return createElement("div", { style: "color: red" }, ["hello world"]);
}

mount(App(), document.querySelector("#root"));
