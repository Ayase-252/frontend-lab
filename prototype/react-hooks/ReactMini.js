let componentUnderRendering = null;
// state count must keep track of the setState call
let stateCount = null;

let states = new Map();

function render(component) {
  stateCount = 0;
  component();
}

function useState(initState) {
  const setState = (newState) => {
    states.set(stateCount, newState);
  };
  if (states.has(stateCount)) {
    return [states.get(stateCount), setState];
  }
  states.set(stateCount, initState);
  return [initState, setState];
}

function comp() {
  const [num, setNum] = useState(1);

  console.log(num);
  setTimeout(() => {
    setNum(10);
  }, 0);
}

render(comp);

setTimeout(() => {
  render(comp);
}, 1000);
