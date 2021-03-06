import highlightRange from "./highlight-range";
import { fromRange } from "dom-anchor-text-quote";

export function getSelectedRange(selection) {
  if (!selection || selection.focusNode === null) {
    return null;
  }
  const range = selection.rangeAtZero;
  if (!range ) {
    return null;
  }
  return range;
}

export default function highlight(
  element,
  customObject,
  selectHandler,
  component,
  props,
  range = getSelectedRange()
) {
  try {
    const { cleanupMethod, nodes } = highlightRange(
      range,
      customObject,
      selectHandler,
      component,
      props
    );
    return {
      cleanupMethod,
      nodes,
      textQuote: fromRange(element, range)
    };
  } catch (TypeError) {
    // this can happen if the last element is outside of the selected area, ignore and move on
  }
  return null;
}
