let currRenderingElem = null;

export function setCurrRenderingElem(comp) {
  currRenderingElem = comp;
}

export function getCurrRenderingElem() {
  return currRenderingElem;
}
