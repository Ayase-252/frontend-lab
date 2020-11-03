import { renderElem, rerender } from "./element";
import { getCurrRenderingElem } from "./shared";

let nextStateIndex = 0;

export function resetStateIndex() {
  nextStateIndex = 0;
}

function getStateMemory(elem) {
  if (!elem.__stateMemory) {
    elem.__stateMemory = [];
  }

  return elem.__stateMemory;
}

// how to related to the component
export function useState(initState) {
  const currRenderingElem = getCurrRenderingElem();

  const stateIdx = nextStateIndex;
  const stateMemory = getStateMemory(currRenderingElem);
  stateMemory[stateIdx] = stateMemory[stateIdx] || initState;

  function setState(newState) {
    stateMemory[stateIdx] = newState;
    rerender(currRenderingElem);
  }
  return [stateMemory[nextStateIndex++], setState];
}

export function useEffect() {}
