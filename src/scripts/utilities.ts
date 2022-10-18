export function removeAttribute(els: Element[], attribute: string) {
  for (const el of els) {
    el.removeAttribute(attribute);
  }
}

export function setAttribute(
  els: Element[],
  attributeName: string,
  attributeValue = ''
) {
  for (const el of els) {
    el.setAttribute(attributeName, attributeValue);
  }
}
