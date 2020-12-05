export const findSibling = (target, className) => {
  const siblings = target.parentNode.childNodes;

  for (let i = 0; i < siblings.length; i++) {
    if (siblings[i].classList.contains(className)) {
      return siblings[i];
    }
  }
};
