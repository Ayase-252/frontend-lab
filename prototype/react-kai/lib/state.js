let currRenderingComponent = null;

export function setCurrRenderingComponent(comp) {
  currRenderingComponent = comp;
}

export function getCurrRenderingComponent() {
  return currRenderingComponent;
}
