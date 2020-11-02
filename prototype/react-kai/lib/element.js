export function createElement(tag, props, children = []) {
  return {
    tag,
    props,
    children,
  };
}

export function renderElem(elem) {
  // if elem is a sole string, we create a Text Node for the elem
  if (typeof elem === "string") {
    return document.createTextNode(elem);
  }

  const newElem = document.createElement(elem.tag);
  for (const attr in elem.props) {
    newElem[attr] = elem.props[attr];
  }

  for (const child of elem.children) {
    newElem.appendChild(renderElem(child));
  }
  return newElem;
}

export function mount(root, mountNode) {
  mountNode.__elemTree = root;
  mountNode.append(renderElem(root));
}
