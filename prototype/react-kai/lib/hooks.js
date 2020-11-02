import { renderElem, renderSubTree } from "./element";
import { getCurrRenderingComponent } from "./state";

let nextStateIndex = 0;

export function resetStateIndex() {
  nextStateIndex = 0;
}

// how to related to the component
export function useState(initState) {
  const currRenderingComp = getCurrRenderingComponent();

  const stateIdx = nextStateIndex;
  if (!currRenderingComp.stateMemory) {
    currRenderingComp.stateMemory = [];
  }

  const stateMemory = currRenderingComp.stateMemory;
  stateMemory[stateIdx] = stateMemory[stateIdx] || initState;

  function setState(newState) {
    stateMemory[stateIdx] = newState;
    renderSubTree(currRenderingComp);
  }
  return [stateMemory[nextStateIndex++], setState];
}

export function useEffect() {}
