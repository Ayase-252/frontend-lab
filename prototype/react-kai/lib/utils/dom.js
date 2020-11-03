/**
 * Replace self with new root
 * @param {HTMLElement} self
 * @param {HTMLElement} newRoot
 */
export function replaceSelfWith(self, newRoot) {
  self.parentNode.replaceChild(newRoot, self);
}
