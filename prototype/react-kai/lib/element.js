import { resetStateIndex } from "./hooks";
import { setCurrRenderingComponent } from "./state";
import { replaceSelfWith } from "./utils/dom";

export function createElement(component, props, children = []) {
  return {
    component,
    props,
    children,
  };
}

function declareRendering(elem) {
  setCurrRenderingComponent(elem);
  resetStateIndex(0);
}

export function renderElem(elem) {
  declareRendering(elem);
  // if elem is a sole string, we create a Text Node for the elem
  if (typeof elem === "string") {
    return document.createTextNode(elem);
  }
  if (typeof elem.component === "function") {
    const newNode = renderElem(elem.component(elem.props));
    elem.__associatedNode = newNode;
    return newNode;
  }
  const newNode = document.createElement(elem.component);
  for (const attr in elem.props) {
    newNode[attr] = elem.props[attr];
  }

  for (const child of elem.children) {
    newNode.appendChild(renderElem(child));
  }
  elem.__associatedNode = newNode;
  return newNode;
}

export function mount(root, mountNode) {
  mountNode.__elemTree = root;
  mountNode.append(renderElem(root));
}

export function rerender(root) {
  const oldNode = root.__associatedNode;
  const newNode = renderElem(root);
  replaceSelfWith(oldNode, newNode);
}
